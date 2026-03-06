"""Azure AI Language + Translator — Language detection and translation."""

import logging
import uuid
import httpx
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from app.config import settings

logger = logging.getLogger(__name__)


class LanguageService:
    def __init__(self):
        self.text_client = None

    def initialize(self):
        if not settings.LANGUAGE_KEY:
            logger.warning("Language key not set; service disabled")
            return
        self.text_client = TextAnalyticsClient(
            endpoint=settings.LANGUAGE_ENDPOINT,
            credential=AzureKeyCredential(settings.LANGUAGE_KEY),
        )
        logger.info("LanguageService initialized")

    async def detect_language(self, text: str) -> str:
        result = self.text_client.detect_language(documents=[text])
        if result and not result[0].is_error:
            return result[0].primary_language.iso6391_name
        return "en"

    async def translate_text(self, text: str, target_language: str) -> str:
        url = f"{settings.TRANSLATOR_ENDPOINT}/translate"
        params = {"api-version": "3.0", "to": target_language}
        headers = {
            "Ocp-Apim-Subscription-Key": settings.TRANSLATOR_KEY,
            "Ocp-Apim-Subscription-Region": settings.TRANSLATOR_REGION,
            "Content-type": "application/json",
            "X-ClientTraceId": str(uuid.uuid4()),
        }
        body = [{"text": text}]
        async with httpx.AsyncClient() as client:
            response = await client.post(url, params=params, headers=headers, json=body)
            response.raise_for_status()
            data = response.json()
        if data and data[0].get("translations"):
            return data[0]["translations"][0]["text"]
        return text

    async def extract_key_phrases(self, text: str) -> list:
        result = self.text_client.extract_key_phrases(documents=[text])
        if result and not result[0].is_error:
            return result[0].key_phrases
        return []

    async def ping(self):
        assert self.text_client is not None


language_service = LanguageService()
