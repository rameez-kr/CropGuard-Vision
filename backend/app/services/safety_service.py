"""Azure AI Content Safety — Moderate generated treatment advice."""

import logging
from dataclasses import dataclass
from typing import List
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions
from azure.core.credentials import AzureKeyCredential
from app.config import settings

logger = logging.getLogger(__name__)

SEVERITY_THRESHOLD = 2


@dataclass
class SafetyResult:
    is_safe: bool
    categories: dict
    flagged_categories: List[str]


class ContentSafetyService:
    def __init__(self):
        self.client = None

    def initialize(self):
        if not settings.CONTENT_SAFETY_KEY:
            logger.warning("Content Safety key not set; service disabled")
            return
        self.client = ContentSafetyClient(
            endpoint=settings.CONTENT_SAFETY_ENDPOINT,
            credential=AzureKeyCredential(settings.CONTENT_SAFETY_KEY),
        )
        logger.info("ContentSafetyService initialized")

    async def check_text_safety(self, text: str) -> SafetyResult:
        request = AnalyzeTextOptions(text=text)
        response = self.client.analyze_text(request)
        categories = {}
        flagged = []
        for item in response.categories_analysis:
            categories[item.category] = item.severity
            if item.severity > SEVERITY_THRESHOLD:
                flagged.append(item.category)
        return SafetyResult(is_safe=len(flagged) == 0, categories=categories, flagged_categories=flagged)

    def get_fallback_advice(self, disease: str, language: str) -> str:
        display = disease.replace("_", " ")
        return (
            f"## {display}\n\n"
            f"We detected signs of {display}.\n\n"
            f"**Recommended steps:**\n"
            f"1. Remove visibly affected leaves immediately\n"
            f"2. Improve air circulation around plants\n"
            f"3. Consult your local agricultural extension office\n"
            f"4. Do not apply chemicals without expert guidance\n\n"
            f"*Please consult a local agronomist for specific treatment.*"
        )

    async def ping(self):
        assert self.client is not None


safety_service = ContentSafetyService()
