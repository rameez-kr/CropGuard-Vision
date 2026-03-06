"""
SQLite database service for CropGuard Vision.

Stores: users (with roles/quotas), crops, diseases, languages,
prediction history, and API usage tracking.
Uses aiosqlite for async access. Auto-creates tables and seeds
reference data on first run.
"""

import logging
from datetime import datetime, timezone
import aiosqlite
from pathlib import Path
from app.config import settings

logger = logging.getLogger(__name__)

DB_PATH = Path(settings.DATABASE_PATH)

SEED_CROPS = [
    ("tomato",       "Tomato (Thakkali)",       "🍅"),
    ("chilli",       "Green Chilli (Mulaku)",   "🌶️"),
    ("brinjal",      "Brinjal (Vazhuthana)",   "🍆"),
    ("okra",         "Okra (Vendakka)",         "🫛"),
    ("cucumber",     "Cucumber (Vellarikka)",   "🥒"),
    ("bittergourd",  "Bitter Gourd (Pavakka)", "🥬"),
    ("snakegourd",   "Snake Gourd (Padavalanga)", "🌿"),
    ("banana",       "Banana (Vazhapazham)",   "🍌"),
    ("coconut",      "Coconut (Thenga)",        "🥥"),
    ("mango",        "Mango (Manga)",           "🥭"),
    ("papaya",       "Papaya (Kappakka)",       "🍈"),
    ("curry_leaf",   "Curry Leaf (Kariveppila)", "🌿"),
    ("drumstick",    "Drumstick (Muringakka)", "🥢"),
    ("tapioca",      "Tapioca (Kappa)",         "🫛"),
    ("cowpea",       "Cowpea (Payar)",          "🫘"),
    ("pumpkin",      "Pumpkin (Mathanga)",      "🎃"),
    ("spinach",      "Spinach (Cheera)",        "🥬"),
    ("jackfruit",    "Jackfruit (Chakka)",      "🍈"),
    ("pepper_vine",  "Black Pepper (Kurumulaku)", "🫚"),
    ("turmeric",     "Turmeric (Manjal)",       "🟡"),
]

SEED_DISEASES = [
    # Tomato
    ("tomato",      "Tomato_Early_Blight",       "Tomato Early Blight"),
    ("tomato",      "Tomato_Late_Blight",        "Tomato Late Blight"),
    ("tomato",      "Tomato_Leaf_Curl",          "Tomato Leaf Curl Virus"),
    ("tomato",      "Tomato_Mosaic",             "Tomato Mosaic Virus"),
    ("tomato",      "Tomato_Healthy",            "Tomato Healthy"),
    # Chilli
    ("chilli",      "Chilli_Leaf_Curl",          "Chilli Leaf Curl"),
    ("chilli",      "Chilli_Anthracnose",        "Chilli Anthracnose"),
    ("chilli",      "Chilli_Powdery_Mildew",     "Chilli Powdery Mildew"),
    ("chilli",      "Chilli_Healthy",            "Chilli Healthy"),
    # Brinjal
    ("brinjal",     "Brinjal_Bacterial_Wilt",    "Brinjal Bacterial Wilt"),
    ("brinjal",     "Brinjal_Leaf_Spot",         "Brinjal Leaf Spot"),
    ("brinjal",     "Brinjal_Fruit_Borer",       "Brinjal Fruit & Shoot Borer"),
    ("brinjal",     "Brinjal_Healthy",           "Brinjal Healthy"),
    # Okra
    ("okra",        "Okra_Yellow_Vein_Mosaic",   "Okra Yellow Vein Mosaic"),
    ("okra",        "Okra_Powdery_Mildew",       "Okra Powdery Mildew"),
    ("okra",        "Okra_Healthy",              "Okra Healthy"),
    # Cucumber
    ("cucumber",    "Cucumber_Downy_Mildew",     "Cucumber Downy Mildew"),
    ("cucumber",    "Cucumber_Powdery_Mildew",   "Cucumber Powdery Mildew"),
    ("cucumber",    "Cucumber_Mosaic",           "Cucumber Mosaic Virus"),
    ("cucumber",    "Cucumber_Healthy",          "Cucumber Healthy"),
    # Bitter Gourd
    ("bittergourd", "Bittergourd_Downy_Mildew",  "Bitter Gourd Downy Mildew"),
    ("bittergourd", "Bittergourd_Leaf_Spot",     "Bitter Gourd Leaf Spot"),
    ("bittergourd", "Bittergourd_Healthy",       "Bitter Gourd Healthy"),
    # Snake Gourd
    ("snakegourd",  "Snakegourd_Powdery_Mildew", "Snake Gourd Powdery Mildew"),
    ("snakegourd",  "Snakegourd_Leaf_Blight",    "Snake Gourd Leaf Blight"),
    ("snakegourd",  "Snakegourd_Healthy",        "Snake Gourd Healthy"),
    # Banana
    ("banana",      "Banana_Panama_Wilt",        "Banana Panama Wilt"),
    ("banana",      "Banana_Sigatoka_Leaf_Spot", "Banana Sigatoka Leaf Spot"),
    ("banana",      "Banana_Bunchy_Top",         "Banana Bunchy Top Virus"),
    ("banana",      "Banana_Healthy",            "Banana Healthy"),
    # Coconut
    ("coconut",     "Coconut_Bud_Rot",           "Coconut Bud Rot"),
    ("coconut",     "Coconut_Leaf_Blight",       "Coconut Leaf Blight"),
    ("coconut",     "Coconut_Root_Wilt",         "Coconut Root Wilt"),
    ("coconut",     "Coconut_Healthy",           "Coconut Healthy"),
    # Mango
    ("mango",       "Mango_Anthracnose",         "Mango Anthracnose"),
    ("mango",       "Mango_Powdery_Mildew",      "Mango Powdery Mildew"),
    ("mango",       "Mango_Sooty_Mold",          "Mango Sooty Mold"),
    ("mango",       "Mango_Healthy",             "Mango Healthy"),
    # Papaya
    ("papaya",      "Papaya_Ring_Spot",          "Papaya Ring Spot Virus"),
    ("papaya",      "Papaya_Leaf_Curl",          "Papaya Leaf Curl"),
    ("papaya",      "Papaya_Healthy",            "Papaya Healthy"),
    # Curry Leaf
    ("curry_leaf",  "CurryLeaf_Leaf_Spot",       "Curry Leaf Leaf Spot"),
    ("curry_leaf",  "CurryLeaf_Psyllid_Damage",  "Curry Leaf Psyllid Damage"),
    ("curry_leaf",  "CurryLeaf_Healthy",         "Curry Leaf Healthy"),
    # Drumstick
    ("drumstick",   "Drumstick_Leaf_Spot",       "Drumstick Leaf Spot"),
    ("drumstick",   "Drumstick_Root_Rot",        "Drumstick Root Rot"),
    ("drumstick",   "Drumstick_Healthy",         "Drumstick Healthy"),
    # Tapioca
    ("tapioca",     "Tapioca_Mosaic",            "Tapioca Mosaic Disease"),
    ("tapioca",     "Tapioca_Leaf_Spot",         "Tapioca Leaf Spot"),
    ("tapioca",     "Tapioca_Tuber_Rot",         "Tapioca Tuber Rot"),
    ("tapioca",     "Tapioca_Healthy",           "Tapioca Healthy"),
    # Cowpea
    ("cowpea",      "Cowpea_Mosaic",             "Cowpea Mosaic Virus"),
    ("cowpea",      "Cowpea_Rust",               "Cowpea Rust"),
    ("cowpea",      "Cowpea_Healthy",            "Cowpea Healthy"),
    # Pumpkin
    ("pumpkin",     "Pumpkin_Powdery_Mildew",    "Pumpkin Powdery Mildew"),
    ("pumpkin",     "Pumpkin_Downy_Mildew",      "Pumpkin Downy Mildew"),
    ("pumpkin",     "Pumpkin_Leaf_Spot",         "Pumpkin Leaf Spot"),
    ("pumpkin",     "Pumpkin_Healthy",           "Pumpkin Healthy"),
    # Spinach
    ("spinach",     "Spinach_Downy_Mildew",      "Spinach Downy Mildew"),
    ("spinach",     "Spinach_Leaf_Spot",         "Spinach Leaf Spot"),
    ("spinach",     "Spinach_Healthy",           "Spinach Healthy"),
    # Jackfruit
    ("jackfruit",   "Jackfruit_Rhizopus_Rot",    "Jackfruit Rhizopus Rot"),
    ("jackfruit",   "Jackfruit_Leaf_Spot",       "Jackfruit Leaf Spot"),
    ("jackfruit",   "Jackfruit_Healthy",         "Jackfruit Healthy"),
    # Black Pepper
    ("pepper_vine", "Pepper_Quick_Wilt",         "Black Pepper Quick Wilt"),
    ("pepper_vine", "Pepper_Slow_Decline",       "Black Pepper Slow Decline"),
    ("pepper_vine", "Pepper_Pollu_Disease",      "Black Pepper Pollu Disease"),
    ("pepper_vine", "Pepper_Vine_Healthy",       "Black Pepper Healthy"),
    # Turmeric
    ("turmeric",    "Turmeric_Leaf_Blotch",      "Turmeric Leaf Blotch"),
    ("turmeric",    "Turmeric_Rhizome_Rot",      "Turmeric Rhizome Rot"),
    ("turmeric",    "Turmeric_Healthy",          "Turmeric Healthy"),
]

SEED_LANGUAGES = [
    ("en", "English",    "en-US-JennyNeural"),
    ("ml", "Malayalam",  "ml-IN-SobhanaNeural"),
    ("hi", "Hindi",      "hi-IN-SwaraNeural"),
]

SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS users (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    name             TEXT NOT NULL,
    email            TEXT NOT NULL UNIQUE,
    password_hash    TEXT,
    provider         TEXT NOT NULL DEFAULT 'local',
    role             TEXT NOT NULL DEFAULT 'user',
    status           TEXT NOT NULL DEFAULT 'active',
    max_diagnoses    INTEGER NOT NULL DEFAULT 3,
    access_requested INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS crops (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    icon        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS diseases (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    crop_id      TEXT NOT NULL REFERENCES crops(id),
    tag_name     TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS languages (
    code  TEXT PRIMARY KEY,
    name  TEXT NOT NULL,
    voice TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS predictions (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id  TEXT NOT NULL UNIQUE,
    session_id  TEXT NOT NULL,
    user_id     INTEGER REFERENCES users(id),
    disease     TEXT NOT NULL,
    confidence  REAL NOT NULL,
    crop_type   TEXT NOT NULL,
    image_url   TEXT NOT NULL DEFAULT '',
    language    TEXT NOT NULL DEFAULT 'en',
    created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_usage (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER REFERENCES users(id),
    service     TEXT NOT NULL,
    created_at  TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_predictions_session ON predictions(session_id);
CREATE INDEX IF NOT EXISTS idx_predictions_user ON predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_service ON api_usage(service);
CREATE INDEX IF NOT EXISTS idx_api_usage_created ON api_usage(created_at);
"""

MIGRATE_SQL = [
    "ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'",
    "ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'active'",
    "ALTER TABLE users ADD COLUMN max_diagnoses INTEGER NOT NULL DEFAULT 3",
    "ALTER TABLE users ADD COLUMN access_requested INTEGER NOT NULL DEFAULT 0",
]


async def create_user(
    name: str,
    email: str,
    password_hash: str | None,
    provider: str = "local",
    role: str = "user",
) -> dict:
    async with aiosqlite.connect(DB_PATH) as db:
        max_diag = -1 if role == "admin" else 3
        cursor = await db.execute(
            "INSERT INTO users (name, email, password_hash, provider, role, max_diagnoses) VALUES (?, ?, ?, ?, ?, ?)",
            (name, email, password_hash, provider, role, max_diag),
        )
        await db.commit()
        user_id = cursor.lastrowid
    return {
        "id": user_id, "name": name, "email": email,
        "password_hash": password_hash, "role": role,
        "status": "active", "max_diagnoses": max_diag,
    }


async def get_user_by_email(email: str) -> dict | None:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "SELECT id, name, email, password_hash, provider, role, status, max_diagnoses, access_requested FROM users WHERE email = ?",
            (email,),
        )
        row = await cursor.fetchone()
    if not row:
        return None
    return {
        "id": row[0],
        "name": row[1],
        "email": row[2],
        "password_hash": row[3],
        "provider": row[4],
        "role": row[5],
        "status": row[6],
        "max_diagnoses": row[7],
        "access_requested": row[8],
    }


async def init_db():
    """Create tables, run migrations, seed data, and promote admin."""
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.executescript(SCHEMA_SQL)

        # Run column migrations for existing databases
        for stmt in MIGRATE_SQL:
            try:
                await db.execute(stmt)
            except Exception:
                pass  # Column already exists
        await db.commit()

        row = await db.execute_fetchall("SELECT COUNT(*) FROM crops")
        if row[0][0] == 0:
            await db.executemany(
                "INSERT INTO crops (id, name, icon) VALUES (?, ?, ?)",
                SEED_CROPS,
            )
            await db.executemany(
                "INSERT INTO diseases (crop_id, tag_name, display_name) VALUES (?, ?, ?)",
                SEED_DISEASES,
            )
            await db.executemany(
                "INSERT INTO languages (code, name, voice) VALUES (?, ?, ?)",
                SEED_LANGUAGES,
            )
            await db.commit()
            logger.info("Database seeded with reference data")
        else:
            logger.info("Database already contains data")

        # Ensure all seed languages exist
        await db.executemany(
            "INSERT OR IGNORE INTO languages (code, name, voice) VALUES (?, ?, ?)",
            SEED_LANGUAGES,
        )

        # Auto-promote admin by email on every startup
        if settings.ADMIN_EMAIL:
            await db.execute(
                "UPDATE users SET role='admin', max_diagnoses=-1 WHERE email=? AND role!='admin'",
                (settings.ADMIN_EMAIL,),
            )
        await db.commit()

    logger.info(f"Database ready: {DB_PATH}")


def _row_to_dict(cursor_description, row):
    """Convert a sqlite3.Row to a dict."""
    return {col[0]: row[i] for i, col in enumerate(cursor_description)}


async def get_crops():
    """Return all crops with their disease count."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT c.id, c.name, c.icon, COUNT(d.id) AS diseases_count
            FROM crops c
            LEFT JOIN diseases d ON d.crop_id = c.id
            GROUP BY c.id
            ORDER BY c.name
        """)
        rows = await cursor.fetchall()
        return [
            {"id": r[0], "name": r[1], "icon": r[2], "diseases_count": r[3]}
            for r in rows
        ]


async def get_crop_detail(crop_id: str):
    """Return a single crop with its full disease list."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "SELECT id, name, icon FROM crops WHERE id = ?", (crop_id,)
        )
        row = await cursor.fetchone()
        if not row:
            return None

        cursor = await db.execute(
            "SELECT id, tag_name, display_name FROM diseases WHERE crop_id = ? ORDER BY display_name",
            (crop_id,),
        )
        disease_rows = await cursor.fetchall()
        return {
            "id": row[0],
            "name": row[1],
            "icon": row[2],
            "diseases": [
                {"id": d[0], "tag_name": d[1], "display_name": d[2]}
                for d in disease_rows
            ],
        }


async def get_diseases(crop_id: str = None):
    """Return diseases, optionally filtered by crop."""
    async with aiosqlite.connect(DB_PATH) as db:
        if crop_id:
            cursor = await db.execute(
                "SELECT tag_name, display_name, crop_id FROM diseases WHERE crop_id = ?",
                (crop_id,),
            )
        else:
            cursor = await db.execute(
                "SELECT tag_name, display_name, crop_id FROM diseases ORDER BY crop_id, display_name"
            )
        rows = await cursor.fetchall()
        return [
            {"tag_name": r[0], "display_name": r[1], "crop_id": r[2]}
            for r in rows
        ]


async def get_languages():
    """Return all supported languages."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT code, name, voice FROM languages ORDER BY name")
        rows = await cursor.fetchall()
        return [{"code": r[0], "name": r[1], "voice": r[2]} for r in rows]


async def save_prediction(
    request_id: str,
    session_id: str,
    disease: str,
    confidence: float,
    crop_type: str,
    image_url: str,
    language: str,
    created_at: str,
    user_id: int | None = None,
):
    """Insert a prediction into the history table."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT INTO predictions
               (request_id, session_id, user_id, disease, confidence, crop_type, image_url, language, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (request_id, session_id, user_id, disease, confidence, crop_type, image_url, language, created_at),
        )
        await db.commit()


async def get_predictions(session_id: str = None, user_id: int = None):
    """Return prediction history by session or user, newest first."""
    async with aiosqlite.connect(DB_PATH) as db:
        if user_id:
            cursor = await db.execute(
                """SELECT request_id, disease, confidence, crop_type, image_url, language, created_at
                   FROM predictions WHERE user_id = ? ORDER BY created_at DESC""",
                (user_id,),
            )
        elif session_id:
            cursor = await db.execute(
                """SELECT request_id, disease, confidence, crop_type, image_url, language, created_at
                   FROM predictions WHERE session_id = ? ORDER BY created_at DESC""",
                (session_id,),
            )
        else:
            return []
        rows = await cursor.fetchall()
        return [
            {
                "request_id": r[0],
                "disease": r[1],
                "confidence": r[2],
                "crop_type": r[3],
                "image_url": r[4],
                "language": r[5],
                "timestamp": r[6],
            }
            for r in rows
        ]


# ── Admin / Quota helpers ────────────────────────────────────

async def get_user_prediction_count(user_id: int) -> int:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "SELECT COUNT(*) FROM predictions WHERE user_id = ?", (user_id,)
        )
        row = await cursor.fetchone()
        return row[0] if row else 0


async def set_access_requested(user_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "UPDATE users SET access_requested = 1 WHERE id = ?", (user_id,)
        )
        await db.commit()


async def get_all_users_with_stats():
    """Return all users with their prediction count for admin dashboard."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT u.id, u.name, u.email, u.provider, u.role, u.status,
                   u.max_diagnoses, u.access_requested,
                   COUNT(p.id) AS prediction_count
            FROM users u
            LEFT JOIN predictions p ON p.user_id = u.id
            GROUP BY u.id
            ORDER BY u.id DESC
        """)
        rows = await cursor.fetchall()
        return [
            {
                "id": r[0], "name": r[1], "email": r[2], "provider": r[3],
                "role": r[4], "status": r[5], "max_diagnoses": r[6],
                "access_requested": r[7], "prediction_count": r[8],
            }
            for r in rows
        ]


async def update_user_admin(
    user_id: int,
    status: str | None = None,
    max_diagnoses: int | None = None,
    access_requested: int | None = None,
):
    """Admin updates a user's status, quota, or access request flag."""
    updates, params = [], []
    if status is not None:
        updates.append("status = ?")
        params.append(status)
    if max_diagnoses is not None:
        updates.append("max_diagnoses = ?")
        params.append(max_diagnoses)
    if access_requested is not None:
        updates.append("access_requested = ?")
        params.append(access_requested)
    if not updates:
        return
    params.append(user_id)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            f"UPDATE users SET {', '.join(updates)} WHERE id = ?", params
        )
        await db.commit()


async def get_all_predictions_audit(limit: int = 100, offset: int = 0):
    """Return all predictions with user info for admin audit log."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT p.request_id, p.disease, p.confidence, p.crop_type,
                   p.language, p.created_at, p.image_url,
                   u.name AS user_name, u.email AS user_email
            FROM predictions p
            LEFT JOIN users u ON u.id = p.user_id
            ORDER BY p.created_at DESC
            LIMIT ? OFFSET ?
        """, (limit, offset))
        rows = await cursor.fetchall()

        count_cursor = await db.execute("SELECT COUNT(*) FROM predictions")
        total = (await count_cursor.fetchone())[0]

        return {
            "items": [
                {
                    "request_id": r[0], "disease": r[1], "confidence": r[2],
                    "crop_type": r[3], "language": r[4], "timestamp": r[5],
                    "image_url": r[6], "user_name": r[7] or "Anonymous",
                    "user_email": r[8] or "—",
                }
                for r in rows
            ],
            "total": total,
        }


async def log_api_usage(user_id: int | None, service: str):
    now_iso = datetime.now(timezone.utc).isoformat()
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO api_usage (user_id, service, created_at) VALUES (?, ?, ?)",
            (user_id, service, now_iso),
        )
        await db.commit()


async def get_api_usage_summary():
    """Aggregate API call counts by service and time period."""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT service, COUNT(*) AS total,
                   SUM(CASE WHEN created_at >= date('now', '-1 day') THEN 1 ELSE 0 END) AS today,
                   SUM(CASE WHEN created_at >= date('now', '-7 days') THEN 1 ELSE 0 END) AS this_week,
                   SUM(CASE WHEN created_at >= date('now', '-30 days') THEN 1 ELSE 0 END) AS this_month
            FROM api_usage
            GROUP BY service
            ORDER BY total DESC
        """)
        rows = await cursor.fetchall()
        return [
            {
                "service": r[0], "total": r[1],
                "today": r[2], "this_week": r[3], "this_month": r[4],
            }
            for r in rows
        ]
