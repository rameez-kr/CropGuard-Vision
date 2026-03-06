"""GET /api/languages — List supported languages from DB."""

from fastapi import APIRouter
from app.services.database import get_languages

router = APIRouter()


@router.get("/languages", summary="Get supported languages")
async def list_languages():
    languages = await get_languages()
    return {"languages": languages}
