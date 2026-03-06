"""Season detection based on Indian agricultural calendar."""

from datetime import datetime


def get_current_season() -> str:
    month = datetime.now().month
    return get_season_for_month(month)


def get_season_for_month(month: int) -> str:
    if not 1 <= month <= 12:
        raise ValueError(f"Month must be 1-12, got {month}")
    if 6 <= month <= 10:
        return "kharif"
    elif month >= 11 or month <= 3:
        return "rabi"
    else:
        return "zaid"
