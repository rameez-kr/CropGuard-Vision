/**
 * AppContext — Global state for the entire app.
 *
 * Manages: language selection, session ID, loading state,
 * prediction results, error state, reference data.
 */

import { createContext, useContext, useReducer, useEffect } from "react";
import { SESSION_STORAGE_KEY, DEFAULT_LANGUAGE } from "../constants/config";
import { FALLBACK_CROPS } from "../constants/crop";
import { FALLBACK_LANGUAGES } from "../constants/languages";
import api from "../services/api";

// ── Initial State ───────────────────────────────────────────
const initialState = {
  language: DEFAULT_LANGUAGE,
  sessionId: null,
  isLoading: false,
  predictionResult: null,
  error: null,
  crops: FALLBACK_CROPS,
  languages: FALLBACK_LANGUAGES,
};

// ── Reducer ─────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_PREDICTION_RESULT":
      return { ...state, predictionResult: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, predictionResult: null };
    case "SET_CROPS":
      return { ...state, crops: action.payload };
    case "SET_LANGUAGES":
      return { ...state, languages: action.payload };
    case "CLEAR_RESULT":
      return { ...state, predictionResult: null, error: null };
    default:
      return state;
  }
}

// ── Context ─────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Generate or restore session ID
  useEffect(() => {
    let sid = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem(SESSION_STORAGE_KEY, sid);
    }
    dispatch({ type: "SET_SESSION_ID", payload: sid });
  }, []);

  // Fetch reference data on mount
  useEffect(() => {
    api.getCrops().then((res) => {
      dispatch({ type: "SET_CROPS", payload: res.data.crops });
    }).catch(() => {}); // Use fallback on error

    api.getLanguages().then((res) => {
      dispatch({ type: "SET_LANGUAGES", payload: res.data.languages });
    }).catch(() => {});
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be inside AppProvider");
  return context;
}

