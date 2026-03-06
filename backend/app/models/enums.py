"""Enumerations for CropGuard Vision."""

from enum import Enum


class CropType(str, Enum):
    TOMATO = "tomato"
    CHILLI = "chilli"
    BRINJAL = "brinjal"
    OKRA = "okra"
    CUCUMBER = "cucumber"
    BITTERGOURD = "bittergourd"
    SNAKEGOURD = "snakegourd"
    BANANA = "banana"
    COCONUT = "coconut"
    MANGO = "mango"
    PAPAYA = "papaya"
    CURRY_LEAF = "curry_leaf"
    DRUMSTICK = "drumstick"
    TAPIOCA = "tapioca"
    COWPEA = "cowpea"
    PUMPKIN = "pumpkin"
    SPINACH = "spinach"
    JACKFRUIT = "jackfruit"
    PEPPER_VINE = "pepper_vine"
    TURMERIC = "turmeric"


class Season(str, Enum):
    AUTO = "auto"
    KHARIF = "kharif"
    RABI = "rabi"
    ZAID = "zaid"


class SupportedLanguage(str, Enum):
    EN = "en"
    ML = "ml"
    HI = "hi"


class ConfidenceLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

    @staticmethod
    def from_probability(prob: float) -> "ConfidenceLevel":
        if prob >= 0.85:
            return ConfidenceLevel.HIGH
        elif prob >= 0.70:
            return ConfidenceLevel.MEDIUM
        else:
            return ConfidenceLevel.LOW
