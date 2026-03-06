/**
 * API service — all backend communication.
 * Uses Axios with interceptors for auth token, session ID, error formatting, and timeouts.
 */

import axios from "axios";
import { API_BASE_URL, SESSION_STORAGE_KEY } from "../constants/config";

const TOKEN_KEY = "cropguard_token";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  const sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (sessionId) {
    config.headers["X-Session-ID"] = sessionId;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      error.userMessage = error.response?.data?.detail || "Please log in again.";
    } else if (error.response?.status === 409) {
      error.userMessage = error.response?.data?.detail || "Already exists.";
    } else if (error.response?.status === 429) {
      error.userMessage = "Too many requests. Please wait a moment.";
    } else if (error.response?.status === 503) {
      error.userMessage = "Service temporarily unavailable. Try again.";
    } else if (!error.response) {
      error.userMessage = "Network error. Check your internet connection.";
    } else {
      const data = error.response?.data;
      error.userMessage =
        data?.error?.message ||
        data?.detail?.error?.message ||
        (typeof data?.detail === "string" ? data.detail : null) ||
        "Something went wrong. Please try again.";
    }
    return Promise.reject(error);
  }
);

const api = {
  health: () => apiClient.get("/api/health"),

  // Auth
  signup: (body) => apiClient.post("/api/auth/signup", body),
  login: (body) => apiClient.post("/api/auth/login", body),
  googleLogin: (body) => apiClient.post("/api/auth/google", body),
  getMe: () => apiClient.get("/api/auth/me"),

  // Reference data
  getCrops: () => apiClient.get("/api/crops"),
  getCropDetail: (cropId) => apiClient.get(`/api/crops/${cropId}`),
  getLanguages: () => apiClient.get("/api/languages"),
  getDiseases: (cropId) =>
    apiClient.get("/api/diseases", { params: cropId ? { crop_id: cropId } : {} }),

  // Prediction
  predict: (formData) =>
    apiClient.post("/api/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Voice
  voiceQuery: (formData) =>
    apiClient.post("/api/voice-query", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // History
  getHistory: (sessionId) => apiClient.get(`/api/history/${sessionId}`),

  // Admin
  getAdminUsers: () => apiClient.get("/api/admin/users"),
  updateAdminUser: (userId, body) => apiClient.put(`/api/admin/users/${userId}`, body),
  getAdminAudit: (params) => apiClient.get("/api/admin/audit", { params }),
  getAdminUsage: () => apiClient.get("/api/admin/usage"),

  // User self-service
  requestAccess: () => apiClient.post("/api/users/request-access"),
};

export default api;
