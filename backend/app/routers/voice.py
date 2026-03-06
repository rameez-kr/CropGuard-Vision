"""POST /api/voice-query — Voice-based symptom analysis."""

import uuid
import logging
from fastapi import APIRouter, UploadFile, File, Form
from app.models.enums import SupportedLanguage
from app.services.speech_service import speech_service
from app.services.language_service import language_service
from app.services.openai_service import openai_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/voice-query", summary="Analyze symptoms via voice input")
async def voice_query(
    audio: UploadFile = File(..., description="Audio (WAV/WebM, max 30s)"),
    language: SupportedLanguage = Form(default=SupportedLanguage.EN),
    session_id: str = Form(default=None),
):
    request_id = f"req_voice_{uuid.uuid4().hex[:12]}"
    audio_bytes = await audio.read()

    stt = await speech_service.speech_to_text(audio_bytes, language.value)
    detected_lang = await language_service.detect_language(stt.text)
    advice = await openai_service.generate_voice_advice(stt.text, detected_lang)
    audio_url = await speech_service.text_to_speech_and_upload(advice["advice_text"], detected_lang)

    return {
        "success": True,
        "data": {
            "transcription": {
                "text": stt.text,
                "detected_language": detected_lang,
                "confidence": stt.confidence,
            },
            "analysis": {
                "extracted_crop": advice.get("crop"),
                "extracted_symptoms": advice.get("symptoms", []),
                "probable_diseases": advice.get("probable_diseases", []),
            },
            "advice": {
                "text": advice["advice_text"],
                "recommendation": "Upload a photo for accurate diagnosis",
            },
            "audio_response": {
                "url": audio_url,
                "duration_seconds": 0,
                "voice": speech_service.get_voice_name(detected_lang),
            },
            "request_id": request_id,
        },
    }
