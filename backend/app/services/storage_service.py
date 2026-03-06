"""Azure Blob Storage — Upload leaf images and TTS audio files."""

import logging
import uuid
from azure.storage.blob import BlobServiceClient, ContentSettings
from app.config import settings

logger = logging.getLogger(__name__)


class StorageService:
    def __init__(self):
        self.blob_service = None
        self.container_name = None

    def initialize(self):
        if not settings.BLOB_CONNECTION_STRING:
            logger.warning("BLOB_CONNECTION_STRING not set; storage disabled")
            return
        self.blob_service = BlobServiceClient.from_connection_string(settings.BLOB_CONNECTION_STRING)
        self.container_name = settings.BLOB_CONTAINER_NAME
        try:
            self.blob_service.create_container(self.container_name)
            logger.info(f"Created container: {self.container_name}")
        except Exception:
            logger.info(f"Container already exists: {self.container_name}")

    async def upload_image(self, image_bytes: bytes, filename: str) -> str:
        blob_name = f"images/{uuid.uuid4().hex}_{filename}"
        blob_client = self.blob_service.get_blob_client(container=self.container_name, blob=blob_name)
        blob_client.upload_blob(
            image_bytes, overwrite=True,
            content_settings=ContentSettings(content_type="image/jpeg"),
        )
        return blob_client.url

    async def upload_audio(self, audio_bytes: bytes, blob_name: str) -> str:
        blob_client = self.blob_service.get_blob_client(container=self.container_name, blob=blob_name)
        blob_client.upload_blob(
            audio_bytes, overwrite=True,
            content_settings=ContentSettings(content_type="audio/wav"),
        )
        return blob_client.url

    async def ping(self):
        self.blob_service.get_account_information()


storage_service = StorageService()
