import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function usePrediction() {
  const { state, dispatch } = useAppContext();

  async function predict(imageFile, cropType, season) {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_RESULT" });

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
      dispatch({ type: "SET_ERROR", payload: err.userMessage || "Something went wrong." });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return {
    predict,
    result: state.predictionResult,
    isLoading: state.isLoading,
    error: state.error,
  };
}
