"""Tests for TTL cache."""

import time
from app.utils.cache_utils import TTLCache


class TestTTLCache:
    def test_set_get(self):
        c = TTLCache(10, 60)
        c.set("k", "v")
        assert c.get("k") == "v"

    def test_miss(self):
        c = TTLCache()
        assert c.get("nope") is None

    def test_expiry(self):
        c = TTLCache(10, 1)
        c.set("k", "v")
        time.sleep(1.1)
        assert c.get("k") is None

    def test_eviction(self):
        c = TTLCache(max_size=2, ttl_seconds=60)
        c.set("a", 1)
        c.set("b", 2)
        c.set("c", 3)
        assert c.get("a") is None
        assert c.get("c") == 3
