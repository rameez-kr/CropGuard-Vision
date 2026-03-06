"""Simple IP-based rate limiter."""

import time
import logging
from collections import defaultdict
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.config import settings

logger = logging.getLogger(__name__)


class RateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self.requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path
        now = time.time()

        limit, window = self._get_limit(path)
        key = f"{client_ip}:{path}"

        self.requests[key] = [t for t in self.requests[key] if now - t < window]

        if len(self.requests[key]) >= limit:
            logger.warning(f"Rate limited: {client_ip} on {path}")
            return JSONResponse(status_code=429, content={
                "success": False,
                "error": {"code": "RATE_LIMITED", "message": "Too many requests. Please wait."},
            })

        self.requests[key].append(now)
        return await call_next(request)

    def _get_limit(self, path: str) -> tuple:
        if "/predict" in path:
            return settings.RATE_LIMIT_PREDICT, settings.RATE_LIMIT_WINDOW_SECONDS
        elif "/voice" in path:
            return settings.RATE_LIMIT_VOICE, settings.RATE_LIMIT_WINDOW_SECONDS
        return 60, settings.RATE_LIMIT_WINDOW_SECONDS
