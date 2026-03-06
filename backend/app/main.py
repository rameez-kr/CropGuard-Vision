"""CropGuard Vision API — Application Entry Point."""

import logging
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import predict, voice, languages, crops, diseases, history, health, auth, admin
from app.middleware.error_handler import register_exception_handlers
from app.middleware.rate_limiter import RateLimiterMiddleware
from app.services.custom_vision import custom_vision_service
from app.services.image_analysis import image_analysis_service
from app.services.openai_service import openai_service
from app.services.safety_service import safety_service
from app.services.language_service import language_service
from app.services.speech_service import speech_service
from app.services.storage_service import storage_service
from app.services.database import init_db

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper()),
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("=== Starting CropGuard Vision API ===")
    logger.info(f"Environment: {settings.APP_ENV}")

    await init_db()

    services = [
        ("Custom Vision", custom_vision_service),
        ("Image Analysis", image_analysis_service),
        ("OpenAI", openai_service),
        ("Content Safety", safety_service),
        ("Language", language_service),
        ("Speech", speech_service),
        ("Storage", storage_service),
    ]
    for name, svc in services:
        try:
            svc.initialize()
        except Exception as e:
            logger.warning(f"{name} initialization skipped: {e}")

    logger.info("Service initialization complete.")
    yield
    logger.info("=== Shutting down CropGuard Vision API ===")


app = FastAPI(
    title="CropGuard Vision API",
    description="AI-powered crop disease detection and treatment advisory.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

cors_origins = (
    ["*"] if settings.APP_ENV == "development"
    else [settings.FRONTEND_URL]
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
)
app.add_middleware(RateLimiterMiddleware)

register_exception_handlers(app)

app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(crops.router, prefix="/api", tags=["Reference Data"])
app.include_router(languages.router, prefix="/api", tags=["Reference Data"])
app.include_router(diseases.router, prefix="/api", tags=["Reference Data"])
app.include_router(predict.router, prefix="/api", tags=["Prediction"])
app.include_router(voice.router, prefix="/api", tags=["Voice"])
app.include_router(history.router, prefix="/api", tags=["History"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])
