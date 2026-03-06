/**
 * AuthContext — manages authentication state (token, user, login/logout).
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "cropguard_token";
const USER_KEY = "cropguard_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);

  const handleAuthResponse = useCallback((data) => {
    setToken(data.token);
    setUser(data.user);
    setError(null);
  }, []);

  const signup = useCallback(async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.signup({ name, email, password });
      handleAuthResponse(res.data);
      return true;
    } catch (err) {
      setError(err.userMessage || err.response?.data?.detail || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, [handleAuthResponse]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.login({ email, password });
      handleAuthResponse(res.data);
      return true;
    } catch (err) {
      setError(err.userMessage || err.response?.data?.detail || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, [handleAuthResponse]);

  const googleLogin = useCallback(async (accessToken) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.googleLogin({ access_token: accessToken });
      handleAuthResponse(res.data);
      return true;
    } catch (err) {
      setError(err.userMessage || err.response?.data?.detail || "Google login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, [handleAuthResponse]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{
      token, user, loading, error,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === "admin",
      signup, login, googleLogin, logout, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
