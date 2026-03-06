import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function usePrediction() {
  const { state, dispatch } = useAppContext();
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  async function predict(imageFile, cropType, season) {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_RESULT" });
    setQuotaExceeded(false);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("crop_type", cropType);
      formData.append("language", state.language);
      formData.append("season", season);
      if (state.sessionId) formData.append("session_id", state.sessionId);

      const res = await api.predict(formData);
      dispatch({ type: "SET_PREDICTION_RESULT", payload: res.data.data });
    } catch (err) {
      const detail = err.response?.data?.detail;
      const errorObj = typeof detail === "object" ? detail?.error : null;
      if (err.response?.status === 403 && errorObj?.code === "QUOTA_EXCEEDED") {
        setQuotaExceeded(true);
        dispatch({ type: "SET_ERROR", payload: errorObj.message });
      } else {
        dispatch({ type: "SET_ERROR", payload: err.userMessage || "Something went wrong." });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return {
    predict,
    result: state.predictionResult,
    isLoading: state.isLoading,
    error: state.error,
    quotaExceeded,
  };
}
