"""Crop endpoints — list all crops and get crop detail with diseases."""

from fastapi import APIRouter, HTTPException
from app.services.database import get_crops, get_crop_detail

router = APIRouter()


@router.get("/crops", summary="Get supported crop types")
async def list_crops():
    crops = await get_crops()
    return {"crops": crops}


@router.get("/crops/{crop_id}", summary="Get crop details with diseases")
async def crop_detail(crop_id: str):
    crop = await get_crop_detail(crop_id)
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    return crop
