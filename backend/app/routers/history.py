"""GET /api/history — Retrieve past predictions from DB."""

from fastapi import APIRouter, Depends, HTTPException
from app.services.database import get_predictions, get_user_by_email
from app.utils.auth import get_optional_user

router = APIRouter()


@router.get("/history/{session_id}", summary="Get prediction history for a session")
async def get_history(session_id: str, user: dict = Depends(get_optional_user)):
    if user:
        full_user = await get_user_by_email(user["email"])
        if full_user and full_user["status"] == "rejected":
            raise HTTPException(status_code=403, detail="Your account has been suspended. Contact admin.")
        predictions = await get_predictions(user_id=user["id"])
    else:
        predictions = await get_predictions(session_id=session_id)
    return {
        "session_id": session_id,
        "predictions": predictions,
        "total_count": len(predictions),
    }
