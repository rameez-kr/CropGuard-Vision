"""Shared test fixtures."""

import pytest
from PIL import Image
import io


@pytest.fixture
def anyio_backend():
    return "asyncio"


def make_test_image(width=500, height=500, fmt="JPEG") -> bytes:
    img = Image.new("RGB", (width, height), color="green")
    buf = io.BytesIO()
    img.save(buf, format=fmt)
    return buf.getvalue()
