/**
 * Application configuration constants.
 * API_BASE_URL: empty in dev (Vite proxy), full URL in production (.env.production).
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const MAX_IMAGE_SIZE_MB = 10;
export const MAX_VOICE_DURATION_SECONDS = 30;
export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_SEASON = "auto";
export const SESSION_STORAGE_KEY = "cropguard_session_id";
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
