"""Simple in-memory cache with TTL."""

import time
import logging
from collections import OrderedDict
from app.config import settings

logger = logging.getLogger(__name__)


class TTLCache:
    def __init__(self, max_size: int = 100, ttl_seconds: int = 3600):
        self.max_size = max_size
        self.ttl = ttl_seconds
        self._cache: OrderedDict = OrderedDict()

    def get(self, key: str):
        if key in self._cache:
            value, timestamp = self._cache[key]
            if time.time() - timestamp < self.ttl:
                self._cache.move_to_end(key)
                return value
            else:
                del self._cache[key]
        return None

    def set(self, key: str, value):
        if key in self._cache:
            del self._cache[key]
        elif len(self._cache) >= self.max_size:
            self._cache.popitem(last=False)
        self._cache[key] = (value, time.time())

    def clear(self):
        self._cache.clear()

    @property
    def size(self) -> int:
        return len(self._cache)


treatment_cache = TTLCache(
    max_size=settings.CACHE_MAX_SIZE,
    ttl_seconds=settings.CACHE_TTL_SECONDS,
)
