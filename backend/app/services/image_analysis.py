"""Azure AI Vision — Scene Validation."""

import logging
from dataclasses import dataclass
from typing import List, Optional
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from app.config import settings

logger = logging.getLogger(__name__)

PLANT_KEYWORDS = {
    "plant", "leaf", "tree", "flower", "vegetation", "crop",
    "agriculture", "grass", "garden", "farm", "fruit", "vegetable",
    "herb", "vine", "green", "nature", "botanical", "foliage",
}


@dataclass
class Tag:
    name: str
    confidence: float


@dataclass
class SceneAnalysisResult:
    is_plant: bool
    tags: List[Tag]
    description: Optional[str]


class ImageAnalysisService:
    def __init__(self):
        self.client = None

    def initialize(self):
        if not settings.AI_VISION_KEY:
            logger.warning("AI Vision key not set; service disabled")
            return
        self.client = ImageAnalysisClient(
            endpoint=settings.AI_VISION_ENDPOINT,
            credential=AzureKeyCredential(settings.AI_VISION_KEY),
        )
        logger.info("ImageAnalysisService initialized")

    async def analyze_scene(self, image_bytes: bytes) -> SceneAnalysisResult:
        result = self.client.analyze(
            image_data=image_bytes,
            visual_features=[VisualFeatures.TAGS, VisualFeatures.CAPTION],
        )
        tags = [
            Tag(name=t.name, confidence=t.confidence)
            for t in (result.tags.values if result.tags else [])
        ]
        description = result.caption.text if result.caption else None
        is_plant = self._is_plant_image(tags)
        return SceneAnalysisResult(is_plant=is_plant, tags=tags, description=description)

    def _is_plant_image(self, tags: List[Tag]) -> bool:
        for tag in tags:
            if tag.name.lower() in PLANT_KEYWORDS and tag.confidence >= 0.60:
                return True
        return False

    async def ping(self):
        assert self.client is not None


image_analysis_service = ImageAnalysisService()
