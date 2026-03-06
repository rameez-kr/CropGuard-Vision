"""Image validation utilities."""

import io
import logging
from dataclasses import dataclass
from PIL import Image

logger = logging.getLogger(__name__)

MAX_SIZE_BYTES = 10 * 1024 * 1024
MIN_DIMENSION = 224
MAX_DIMENSION = 4096
ALLOWED_FORMATS = {"JPEG", "PNG"}


@dataclass
class ImageValidation:
    is_valid: bool
    width: int = 0
    height: int = 0
    format: str = ""
    error: str = ""
    error_code: str = ""


def validate_image(image_bytes: bytes, filename: str = "") -> ImageValidation:
    if len(image_bytes) == 0:
        return ImageValidation(is_valid=False, error="Image file is empty.", error_code="IMAGE_EMPTY")

    if len(image_bytes) > MAX_SIZE_BYTES:
        size_mb = MAX_SIZE_BYTES // (1024 * 1024)
        return ImageValidation(
            is_valid=False,
            error=f"Image exceeds maximum size of {size_mb} MB.",
            error_code="IMAGE_TOO_LARGE",
        )

    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.verify()
        img = Image.open(io.BytesIO(image_bytes))
    except Exception:
        return ImageValidation(
            is_valid=False,
            error="Image file is corrupted or unsupported format.",
            error_code="IMAGE_CORRUPTED",
        )

    if img.format not in ALLOWED_FORMATS:
        return ImageValidation(
            is_valid=False,
            error=f"Only JPEG and PNG are supported. Got: {img.format}",
            error_code="INVALID_IMAGE_FORMAT",
        )

    width, height = img.size
    if width < MIN_DIMENSION or height < MIN_DIMENSION:
        return ImageValidation(
            is_valid=False,
            error=f"Image too small ({width}x{height}). Minimum: {MIN_DIMENSION}x{MIN_DIMENSION}.",
            error_code="IMAGE_TOO_SMALL",
        )
    if width > MAX_DIMENSION or height > MAX_DIMENSION:
        return ImageValidation(
            is_valid=False,
            error=f"Image too large ({width}x{height}). Maximum: {MAX_DIMENSION}x{MAX_DIMENSION}.",
            error_code="IMAGE_TOO_LARGE",
        )

    return ImageValidation(is_valid=True, width=width, height=height, format=img.format)
