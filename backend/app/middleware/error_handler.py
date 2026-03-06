"""Global exception handler."""

import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

logger = logging.getLogger(__name__)


class CropGuardException(Exception):
    def __init__(self, message: str, code: str, http_status: int = 400):
        self.message = message
        self.code = code
        self.http_status = http_status
        super().__init__(message)


def register_exception_handlers(app: FastAPI):
    @app.exception_handler(CropGuardException)
    async def cropguard_handler(request: Request, exc: CropGuardException):
        req_id = f"err_{uuid.uuid4().hex[:12]}"
        logger.warning(f"[{req_id}] {exc.code}: {exc.message}")
        return JSONResponse(
            status_code=exc.http_status,
            content={"success": False, "error": {
                "code": exc.code, "message": exc.message, "request_id": req_id,
            }},
        )

    @app.exception_handler(RequestValidationError)
    async def validation_handler(request: Request, exc: RequestValidationError):
        req_id = f"val_{uuid.uuid4().hex[:12]}"
        logger.warning(f"[{req_id}] Validation: {exc.errors()}")
        return JSONResponse(
            status_code=422,
            content={"success": False, "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid request. Check your input.",
                "request_id": req_id,
            }},
        )

    @app.exception_handler(Exception)
    async def generic_handler(request: Request, exc: Exception):
        req_id = f"err_{uuid.uuid4().hex[:12]}"
        logger.error(f"[{req_id}] Unhandled: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred. Please try again.",
                "request_id": req_id,
            }},
        )
