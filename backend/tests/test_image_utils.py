"""Tests for image validation."""

from app.utils.image_utils import validate_image
from tests.conftest import make_test_image


class TestValidateImage:
    def test_valid_jpeg(self):
        result = validate_image(make_test_image(500, 500, "JPEG"), "leaf.jpg")
        assert result.is_valid is True

    def test_valid_png(self):
        result = validate_image(make_test_image(500, 500, "PNG"), "leaf.png")
        assert result.is_valid is True

    def test_empty_file(self):
        result = validate_image(b"", "empty.jpg")
        assert result.is_valid is False
        assert result.error_code == "IMAGE_EMPTY"

    def test_corrupt_file(self):
        result = validate_image(b"not_an_image", "bad.jpg")
        assert result.is_valid is False
        assert result.error_code == "IMAGE_CORRUPTED"

    def test_too_small(self):
        result = validate_image(make_test_image(100, 100), "small.jpg")
        assert result.is_valid is False
        assert result.error_code == "IMAGE_TOO_SMALL"

    def test_oversized_bytes(self):
        result = validate_image(b"\x00" * (11 * 1024 * 1024), "huge.jpg")
        assert result.is_valid is False
        assert result.error_code == "IMAGE_TOO_LARGE"
