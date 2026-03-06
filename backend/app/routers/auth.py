"""Auth routes — signup, login, Google OAuth, current user."""

import logging
import httpx
from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, HTTPException, status, Depends

from app.config import settings
from app.utils.auth import hash_password, verify_password, create_access_token, get_current_user
from app.services.database import create_user, get_user_by_email

logger = logging.getLogger(__name__)
router = APIRouter()

GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


def _user_response(user: dict) -> dict:
    """Build a safe user dict for the auth response (no password hash)."""
    return {
        "id": user["id"], "name": user["name"], "email": user["email"],
        "role": user.get("role", "user"), "status": user.get("status", "active"),
    }


def _check_rejected(user: dict):
    if user.get("status") == "rejected":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Your account has been suspended. Contact admin.")


def _resolve_role(email: str) -> str:
    return "admin" if settings.ADMIN_EMAIL and email.lower() == settings.ADMIN_EMAIL.lower() else "user"


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class GoogleLoginRequest(BaseModel):
    access_token: str


class AuthResponse(BaseModel):
    token: str
    user: dict


@router.post("/auth/signup", summary="Create a new account", response_model=AuthResponse)
async def signup(body: SignupRequest):
    existing = await get_user_by_email(body.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    if len(body.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")

    role = _resolve_role(body.email)
    hashed = hash_password(body.password)
    user = await create_user(name=body.name, email=body.email, password_hash=hashed, provider="local", role=role)

    token = create_access_token(user["id"], user["email"], user["name"], role=user["role"])
    return {"token": token, "user": _user_response(user)}


@router.post("/auth/login", summary="Login with email & password", response_model=AuthResponse)
async def login(body: LoginRequest):
    user = await get_user_by_email(body.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    _check_rejected(user)

    if not user["password_hash"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This account uses Google sign-in. Please use the Google button.",
        )

    if not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(user["id"], user["email"], user["name"], role=user["role"])
    return {"token": token, "user": _user_response(user)}


@router.post("/auth/google", summary="Login/signup with Google", response_model=AuthResponse)
async def google_login(body: GoogleLoginRequest):
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                GOOGLE_USERINFO_URL,
                headers={"Authorization": f"Bearer {body.access_token}"},
            )
            resp.raise_for_status()
            userinfo = resp.json()
    except Exception as e:
        logger.warning(f"Google userinfo fetch failed: {e}")
        raise HTTPException(status_code=401, detail="Invalid Google token")

    email = userinfo.get("email")
    if not email:
        raise HTTPException(status_code=401, detail="Could not retrieve email from Google")

    name = userinfo.get("name", email.split("@")[0])

    user = await get_user_by_email(email)
    if not user:
        role = _resolve_role(email)
        user = await create_user(name=name, email=email, password_hash=None, provider="google", role=role)
    else:
        _check_rejected(user)

    token = create_access_token(user["id"], user["email"], user["name"], role=user["role"])
    return {"token": token, "user": _user_response(user)}


@router.get("/auth/me", summary="Get current user")
async def get_me(user: dict = Depends(get_current_user)):
    return {"user": user}
