"""Tests for season detection."""

import pytest
from app.utils.season_utils import get_season_for_month


class TestSeasonUtils:
    def test_kharif(self):
        for m in [6, 7, 8, 9, 10]:
            assert get_season_for_month(m) == "kharif"

    def test_rabi(self):
        for m in [11, 12, 1, 2, 3]:
            assert get_season_for_month(m) == "rabi"

    def test_zaid(self):
        for m in [4, 5]:
            assert get_season_for_month(m) == "zaid"

    def test_invalid(self):
        with pytest.raises(ValueError):
            get_season_for_month(13)
