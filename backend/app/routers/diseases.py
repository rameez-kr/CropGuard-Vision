"""GET /api/diseases — List known diseases from DB."""

from fastapi import APIRouter, Query
from app.services.database import get_diseases

router = APIRouter()


@router.get("/diseases", summary="Get known crop diseases")
async def list_diseases(crop_id: str = Query(default=None, description="Filter by crop ID")):
    diseases = await get_diseases(crop_id)
    return {"diseases": diseases, "total_count": len(diseases)}
