"""Azure Custom Vision Service — Disease Classification."""

import logging
from dataclasses import dataclass
from typing import List
from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from msrest.authentication import ApiKeyCredentials
from app.config import settings

logger = logging.getLogger(__name__)


@dataclass
class Prediction:
    tag_name: str
    probability: float


@dataclass
class ClassificationResult:
    tag_name: str
    probability: float
    display_name: str
    all_predictions: List[Prediction]


class CustomVisionService:
    def __init__(self):
        self.client = None

    def initialize(self):
        if not settings.CUSTOM_VISION_PREDICTION_KEY:
            logger.warning("Custom Vision key not set; service disabled")
            return
        credentials = ApiKeyCredentials(
            in_headers={"Prediction-key": settings.CUSTOM_VISION_PREDICTION_KEY}
        )
        self.client = CustomVisionPredictionClient(
            endpoint=settings.CUSTOM_VISION_PREDICTION_ENDPOINT,
            credentials=credentials,
        )
        logger.info("CustomVisionService initialized")

    async def classify_image(self, image_bytes: bytes) -> ClassificationResult:
        result = self.client.classify_image(
            project_id=settings.CUSTOM_VISION_PROJECT_ID,
            published_name=settings.CUSTOM_VISION_PUBLISH_NAME,
            image_data=image_bytes,
        )
        sorted_preds = sorted(result.predictions, key=lambda p: p.probability, reverse=True)
        top = sorted_preds[0]
        return ClassificationResult(
            tag_name=top.tag_name,
            probability=top.probability,
            display_name=top.tag_name.replace("_", " "),
            all_predictions=[Prediction(p.tag_name, p.probability) for p in sorted_preds[:5]],
        )

    async def ping(self):
        assert self.client is not None, "Custom Vision client not initialized"


custom_vision_service = CustomVisionService()
