"""GET /api/health — Check all Azure services are reachable."""

import time
import logging
from datetime import datetime, timezone
from fastapi import APIRouter
from app.config import settings
from app.services.custom_vision import custom_vision_service
from app.services.image_analysis import image_analysis_service
from app.services.openai_service import openai_service
from app.services.safety_service import safety_service
from app.services.language_service import language_service
from app.services.speech_service import speech_service
from app.services.storage_service import storage_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health", summary="API and Azure service health check")
async def health_check():
    services = {}
    overall = "healthy"
    checks = {
        "custom_vision": custom_vision_service.ping,
        "ai_vision": image_analysis_service.ping,
        "openai": openai_service.ping,
        "speech": speech_service.ping,
        "language": language_service.ping,
        "content_safety": safety_service.ping,
        "blob_storage": storage_service.ping,
    }
    for name, ping_fn in checks.items():
        try:
            start = time.time()
            await ping_fn()
            ms = int((time.time() - start) * 1000)
            services[name] = f"reachable ({ms}ms)"
        except Exception as e:
            services[name] = f"unreachable: {str(e)[:50]}"
            overall = "degraded"
    return {
        "status": overall,
        "version": "1.0.0",
        "environment": settings.APP_ENV,
        "services": services,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
