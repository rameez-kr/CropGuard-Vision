import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function useVoice() {
  const { state, dispatch } = useAppContext();
  const [voiceResult, setVoiceResult] = useState(null);

  async function sendVoice(audioBlob) {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_RESULT" });

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("language", state.language);
      if (state.sessionId) formData.append("session_id", state.sessionId);

      const res = await api.voiceQuery(formData);
      setVoiceResult(res.data.data);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.userMessage || "Voice query failed." });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return { sendVoice, voiceResult, isLoading: state.isLoading, error: state.error };
}
