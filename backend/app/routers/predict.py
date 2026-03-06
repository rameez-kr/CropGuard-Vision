"""POST /api/predict — Core disease prediction pipeline."""

import time
import uuid
import logging
from datetime import datetime, timezone

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from app.models.enums import CropType, Season, SupportedLanguage, ConfidenceLevel
from app.services.image_analysis import image_analysis_service
from app.services.custom_vision import custom_vision_service
from app.services.openai_service import openai_service
from app.services.safety_service import safety_service
from app.services.language_service import language_service
from app.services.storage_service import storage_service
from app.services.database import save_prediction, get_user_by_email, get_user_prediction_count, log_api_usage
from app.utils.auth import get_optional_user
from app.utils.image_utils import validate_image
from app.utils.season_utils import get_current_season
from app.utils.cache_utils import treatment_cache

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/predict", summary="Upload leaf image for disease detection")
async def predict_disease(
    image: UploadFile = File(..., description="Leaf photo (JPEG/PNG, max 10 MB)"),
    crop_type: CropType = Form(..., description="Crop type"),
    language: SupportedLanguage = Form(default=SupportedLanguage.EN),
    season: Season = Form(default=Season.AUTO),
    session_id: str = Form(default=None),
    user: dict = Depends(get_optional_user),
):
    request_id = f"req_{uuid.uuid4().hex[:12]}"
    start = time.time()
    logger.info(f"[{request_id}] Predict: crop={crop_type.value}, lang={language.value}")

    # Quota and status checks
    if user:
        full_user = await get_user_by_email(user["email"])
        if full_user and full_user["status"] == "rejected":
            raise HTTPException(status_code=403, detail="Your account has been suspended. Contact admin.")
        if full_user and full_user["max_diagnoses"] != -1:
            count = await get_user_prediction_count(user["id"])
            if count >= full_user["max_diagnoses"]:
                raise HTTPException(status_code=403, detail={
                    "success": False,
                    "error": {
                        "code": "QUOTA_EXCEEDED",
                        "message": f"You've used {count}/{full_user['max_diagnoses']} diagnoses. Request admin approval for more.",
                        "request_id": request_id,
                    },
                })

    image_bytes = await image.read()
    val = validate_image(image_bytes, image.filename)
    if not val.is_valid:
        raise HTTPException(status_code=400, detail={
            "success": False,
            "error": {"code": val.error_code, "message": val.error, "request_id": request_id},
        })

    scene = await image_analysis_service.analyze_scene(image_bytes)
    if not scene.is_plant:
        raise HTTPException(status_code=400, detail={
            "success": False,
            "error": {
                "code": "INVALID_IMAGE",
                "message": "This does not appear to be a plant or leaf. Please upload a crop leaf photo.",
                "request_id": request_id,
            },
        })

    prediction = await custom_vision_service.classify_image(image_bytes)
    confidence_level = ConfidenceLevel.from_probability(prediction.probability)

    if prediction.probability < 0.50:
        raise HTTPException(status_code=422, detail={
            "success": False,
            "error": {
                "code": "LOW_CONFIDENCE",
                "message": f"Could not identify disease confidently ({prediction.probability:.0%}). Try a clearer photo.",
                "request_id": request_id,
            },
        })

    resolved_season = get_current_season() if season == Season.AUTO else season.value
    cache_key = f"{prediction.tag_name}_{crop_type.value}_{resolved_season}_{language.value}"

    treatment_text = treatment_cache.get(cache_key)
    if not treatment_text:
        treatment_text = await openai_service.generate_treatment(
            disease=prediction.tag_name, crop=crop_type.value,
            season=resolved_season, language=language.value,
            confidence=prediction.probability,
        )
        treatment_cache.set(cache_key, treatment_text)

    safety = await safety_service.check_text_safety(treatment_text)
    was_translated = False

    if not safety.is_safe:
        logger.warning(f"[{request_id}] Content flagged: {safety.flagged_categories}")
        treatment_text = safety_service.get_fallback_advice(prediction.tag_name, language.value)

    if language.value != "en":
        treatment_text = await language_service.translate_text(treatment_text, language.value)
        was_translated = True

    image_url = await storage_service.upload_image(image_bytes, image.filename or "leaf.jpg")

    total_ms = int((time.time() - start) * 1000)
    logger.info(f"[{request_id}] Done in {total_ms}ms")

    now_iso = datetime.now(timezone.utc).isoformat()

    if session_id or user:
        try:
            await save_prediction(
                request_id=request_id,
                session_id=session_id or "",
                disease=prediction.tag_name,
                confidence=round(prediction.probability * 100, 1),
                crop_type=crop_type.value,
                image_url=image_url or "",
                language=language.value,
                created_at=now_iso,
                user_id=user["id"] if user else None,
            )
        except Exception as e:
            logger.warning(f"[{request_id}] Failed to save prediction history: {e}")

    # Log Azure service usage
    uid = user["id"] if user else None
    try:
        for svc in ["image_analysis", "custom_vision", "openai", "content_safety"]:
            await log_api_usage(uid, svc)
        if was_translated:
            await log_api_usage(uid, "translator")
    except Exception as e:
        logger.warning(f"[{request_id}] Failed to log API usage: {e}")

    return {
        "success": True,
        "data": {
            "disease": {
                "name": prediction.tag_name,
                "display_name": prediction.display_name,
                "confidence": round(prediction.probability * 100, 1),
                "confidence_level": confidence_level.value,
            },
            "treatment": {
                "text": treatment_text,
                "language": language.value,
                "was_translated": was_translated,
            },
            "scene_analysis": {
                "is_plant": scene.is_plant,
                "tags": [{"name": t.name, "confidence": round(t.confidence, 2)} for t in scene.tags[:10]],
                "description": scene.description,
            },
            "image_url": image_url,
            "audio_url": None,
            "timestamp": now_iso,
            "request_id": request_id,
            "processing_time_ms": total_ms,
        },
    }
