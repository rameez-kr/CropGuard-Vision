"""CropGuard Vision — Application Configuration."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    APP_ENV: str = "development"
    FRONTEND_URL: str = "http://localhost:5173"
    LOG_LEVEL: str = "INFO"

    CUSTOM_VISION_PREDICTION_ENDPOINT: str = ""
    CUSTOM_VISION_PREDICTION_KEY: str = ""
    CUSTOM_VISION_PROJECT_ID: str = ""
    CUSTOM_VISION_PUBLISH_NAME: str = "cropguard-v1"

    AI_VISION_ENDPOINT: str = ""
    AI_VISION_KEY: str = ""

    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_KEY: str = ""
    AZURE_OPENAI_DEPLOYMENT: str = "gpt-4o-mini"
    AZURE_OPENAI_API_VERSION: str = "2024-08-01-preview"

    SPEECH_KEY: str = ""
    SPEECH_REGION: str = "eastus"

    LANGUAGE_ENDPOINT: str = ""
    LANGUAGE_KEY: str = ""
    TRANSLATOR_KEY: str = ""
    TRANSLATOR_ENDPOINT: str = "https://api.cognitive.microsofttranslator.com"
    TRANSLATOR_REGION: str = "eastus"

    CONTENT_SAFETY_ENDPOINT: str = ""
    CONTENT_SAFETY_KEY: str = ""

    BLOB_CONNECTION_STRING: str = ""
    BLOB_CONTAINER_NAME: str = "leaf-images"

    RATE_LIMIT_PREDICT: int = 10
    RATE_LIMIT_VOICE: int = 5
    RATE_LIMIT_WINDOW_SECONDS: int = 60

    CACHE_TTL_SECONDS: int = 3600
    CACHE_MAX_SIZE: int = 100

    DATABASE_PATH: str = "data/cropguard.db"

    JWT_SECRET: str = "change-me-in-production"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7
    GOOGLE_CLIENT_ID: str = ""
    ADMIN_EMAIL: str = ""


settings = Settings()
