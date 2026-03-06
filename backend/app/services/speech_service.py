"""Azure AI Speech — Speech-to-Text and Text-to-Speech."""

import logging
import uuid
from dataclasses import dataclass
from app.config import settings

logger = logging.getLogger(__name__)

try:
    import azure.cognitiveservices.speech as speechsdk
    SPEECH_SDK_AVAILABLE = True
except ImportError:
    speechsdk = None
    SPEECH_SDK_AVAILABLE = False
    logger.warning("azure-cognitiveservices-speech not installed; speech features unavailable")

VOICE_MAP = {
    "en": "en-US-JennyNeural",
    "hi": "hi-IN-SwaraNeural",
    "ta": "ta-IN-PallaviNeural",
    "te": "te-IN-ShrutiNeural",
    "kn": "kn-IN-SapnaNeural",
    "mr": "mr-IN-AarohiNeural",
    "bn": "bn-IN-TanishaaNeural",
    "fr": "fr-FR-DeniseNeural",
    "es": "es-ES-ElviraNeural",
    "pt": "pt-BR-FranciscaNeural",
}

LOCALE_MAP = {
    "en": "en-US", "hi": "hi-IN", "ta": "ta-IN", "te": "te-IN",
    "kn": "kn-IN", "mr": "mr-IN", "bn": "bn-IN",
    "fr": "fr-FR", "es": "es-ES", "pt": "pt-BR",
}


@dataclass
class STTResult:
    text: str
    language: str
    confidence: float


class SpeechService:
    def __init__(self):
        self._key = None
        self._region = None

    def initialize(self):
        self._key = settings.SPEECH_KEY
        self._region = settings.SPEECH_REGION
        if SPEECH_SDK_AVAILABLE:
            logger.info("SpeechService initialized")
        else:
            logger.warning("SpeechService initialized (SDK not available)")

    async def speech_to_text(self, audio_bytes: bytes, language: str = "en") -> STTResult:
        if not SPEECH_SDK_AVAILABLE:
            raise RuntimeError("Speech SDK not installed")
        speech_config = speechsdk.SpeechConfig(subscription=self._key, region=self._region)
        speech_config.speech_recognition_language = LOCALE_MAP.get(language, "en-US")
        stream = speechsdk.audio.PushAudioInputStream()
        stream.write(audio_bytes)
        stream.close()
        audio_config = speechsdk.audio.AudioConfig(stream=stream)
        recognizer = speechsdk.SpeechRecognizer(
            speech_config=speech_config, audio_config=audio_config
        )
        result = recognizer.recognize_once()
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            return STTResult(text=result.text, language=language, confidence=0.95)
        raise Exception(f"Speech recognition failed: {result.reason}")

    async def text_to_speech(self, text: str, language: str) -> bytes:
        if not SPEECH_SDK_AVAILABLE:
            raise RuntimeError("Speech SDK not installed")
        speech_config = speechsdk.SpeechConfig(subscription=self._key, region=self._region)
        speech_config.speech_synthesis_voice_name = VOICE_MAP.get(language, VOICE_MAP["en"])
        synthesizer = speechsdk.SpeechSynthesizer(
            speech_config=speech_config, audio_config=None
        )
        result = synthesizer.speak_text(text)
        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            return result.audio_data
        raise Exception(f"Speech synthesis failed: {result.reason}")

    async def text_to_speech_and_upload(self, text: str, language: str) -> str:
        from app.services.storage_service import storage_service
        audio_bytes = await self.text_to_speech(text, language)
        blob_name = f"audio/resp_{uuid.uuid4().hex[:12]}.wav"
        return await storage_service.upload_audio(audio_bytes, blob_name)

    def get_voice_name(self, language: str) -> str:
        return VOICE_MAP.get(language, VOICE_MAP["en"])

    async def ping(self):
        assert self._key is not None


speech_service = SpeechService()
