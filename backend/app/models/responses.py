"""Pydantic response models for the CropGuard Vision API."""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class DiseaseInfo(BaseModel):
    name: str
    display_name: str
    confidence: float = Field(ge=0, le=100)
    confidence_level: str


class TreatmentInfo(BaseModel):
    text: str
    language: str
    was_translated: bool


class SceneTag(BaseModel):
    name: str
    confidence: float


class SceneInfo(BaseModel):
    is_plant: bool
    tags: List[SceneTag]
    description: Optional[str] = None


class TranscriptionInfo(BaseModel):
    text: str
    detected_language: str
    confidence: float


class AudioResponseInfo(BaseModel):
    url: str
    duration_seconds: float
    voice: str


class CropInfo(BaseModel):
    id: str
    name: str
    diseases_count: int
    icon: str


class LanguageInfo(BaseModel):
    code: str
    name: str
    voice: str


class HistoryItem(BaseModel):
    request_id: str
    timestamp: str
    disease: str
    confidence: float
    crop_type: str
    image_url: str
    language: str
