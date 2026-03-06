"""Authentication utilities — JWT creation/verification and password hashing."""

import logging
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.config import settings

logger = logging.getLogger(__name__)

bearer_scheme = HTTPBearer(auto_error=False)

ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(
    user_id: int, email: str, name: str, role: str = "user",
    expires_delta: Optional[timedelta] = None,
) -> str:
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.JWT_EXPIRE_MINUTES))
    payload = {
        "sub": str(user_id),
        "email": email,
        "name": name,
        "role": role,
        "exp": expire,
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def _user_from_payload(payload: dict) -> dict:
    return {
        "id": int(payload["sub"]),
        "email": payload["email"],
        "name": payload["name"],
        "role": payload.get("role", "user"),
    }


async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """FastAPI dependency — extracts and validates the JWT from Authorization header."""
    if not creds:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    payload = decode_access_token(creds.credentials)
    return _user_from_payload(payload)


async def get_optional_user(creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """Returns user dict if token is present and valid, else None."""
    if not creds:
        return None
    try:
        payload = decode_access_token(creds.credentials)
        return _user_from_payload(payload)
    except HTTPException:
        return None


async def get_admin_user(user: dict = Depends(get_current_user)):
    """FastAPI dependency — requires admin role."""
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user
