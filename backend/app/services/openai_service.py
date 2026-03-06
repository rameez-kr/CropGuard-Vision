"""Azure OpenAI Service — Treatment Advice Generation."""

import logging
from openai import AzureOpenAI
from app.config import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT_TREATMENT = """You are CropGuard AI, an expert agronomist and plant pathologist.

A farmer uploaded a photo of a diseased crop leaf. An AI model identified the disease.
Provide practical treatment advice a farmer with no scientific background can follow.

RESPONSE FORMAT (markdown):

## Disease Overview
- What it is (2-3 sentences), what causes it

## Immediate Actions
- Numbered steps to take RIGHT NOW

## Treatment Options
### Organic / Natural Remedies
- 2-3 options with preparation instructions
### Chemical Treatments
- 1-2 options with product name, dosage, application method, frequency

## Prevention Tips
- 3-4 practices to prevent recurrence

## When to Seek Expert Help
- Signs that professional help is needed

RULES:
- Simple, everyday language
- Metric units
- Do NOT recommend banned pesticides
- If confidence < 80%, mention diagnosis may be uncertain
- Respond in the language requested"""

SYSTEM_PROMPT_VOICE = """You are CropGuard AI. A farmer described symptoms verbally (no photo).

1. Acknowledge the symptoms
2. List 1-3 most probable diseases
3. Brief treatment steps for the most likely one
4. Recommend uploading a photo for accurate diagnosis

Keep under 200 words (will be read aloud). Respond in the farmer's language."""


class OpenAIService:
    def __init__(self):
        self.client = None

    def initialize(self):
        if not settings.AZURE_OPENAI_KEY:
            logger.warning("OpenAI key not set; service disabled")
            return
        self.client = AzureOpenAI(
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            api_key=settings.AZURE_OPENAI_KEY,
            api_version=settings.AZURE_OPENAI_API_VERSION,
        )
        logger.info("OpenAIService initialized")

    async def generate_treatment(
        self, disease: str, crop: str, season: str, language: str, confidence: float,
    ) -> str:
        user_prompt = (
            f"Detected Disease: {disease.replace('_', ' ')}\n"
            f"Crop: {crop}\nSeason: {season}\n"
            f"Confidence: {confidence:.0%}\nRespond in: {language}\n\n"
            f"Provide treatment advice."
        )
        response = self.client.chat.completions.create(
            model=settings.AZURE_OPENAI_DEPLOYMENT,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_TREATMENT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
            max_tokens=1000,
            top_p=0.9,
        )
        return response.choices[0].message.content

    async def generate_voice_advice(self, transcription: str, language: str) -> dict:
        user_prompt = f'Farmer said: "{transcription}"\nLanguage: {language}'
        response = self.client.chat.completions.create(
            model=settings.AZURE_OPENAI_DEPLOYMENT,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT_VOICE},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
            max_tokens=500,
        )
        return {
            "advice_text": response.choices[0].message.content,
            "crop": None,
            "symptoms": [],
            "probable_diseases": [],
        }

    async def ping(self):
        assert self.client is not None


openai_service = OpenAIService()
