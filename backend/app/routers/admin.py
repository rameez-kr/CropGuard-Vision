"""Admin endpoints — user management, audit logs, API usage, and access requests."""

from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException

from app.utils.auth import get_admin_user, get_current_user
from app.services.database import (
    get_all_users_with_stats,
    update_user_admin,
    get_all_predictions_audit,
    get_api_usage_summary,
    set_access_requested,
)

router = APIRouter()


class UpdateUserBody(BaseModel):
    status: Optional[str] = None
    max_diagnoses: Optional[int] = None
    access_requested: Optional[int] = None


# ── Admin-only endpoints ──────────────────────────────────

@router.get("/admin/users", summary="List all users with stats")
async def admin_list_users(admin: dict = Depends(get_admin_user)):
    users = await get_all_users_with_stats()
    return {"users": users}


@router.put("/admin/users/{user_id}", summary="Update user status / quota")
async def admin_update_user(
    user_id: int, body: UpdateUserBody, admin: dict = Depends(get_admin_user)
):
    if body.status and body.status not in ("active", "rejected"):
        raise HTTPException(status_code=400, detail="Status must be 'active' or 'rejected'")
    await update_user_admin(
        user_id,
        status=body.status,
        max_diagnoses=body.max_diagnoses,
        access_requested=body.access_requested,
    )
    return {"ok": True}


@router.get("/admin/audit", summary="Audit log of all predictions")
async def admin_audit(
    limit: int = 50, offset: int = 0, admin: dict = Depends(get_admin_user)
):
    return await get_all_predictions_audit(limit=limit, offset=offset)


@router.get("/admin/usage", summary="Azure service API usage summary")
async def admin_usage(admin: dict = Depends(get_admin_user)):
    summary = await get_api_usage_summary()
    return {"services": summary}


# ── User self-service ─────────────────────────────────────

@router.post("/users/request-access", summary="Request more diagnoses from admin")
async def request_access(user: dict = Depends(get_current_user)):
    await set_access_requested(user["id"])
    return {"ok": True, "message": "Access request sent to admin."}
