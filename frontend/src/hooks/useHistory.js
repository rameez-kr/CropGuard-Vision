import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import api from "../services/api";

export default function useHistory() {
  const { state } = useAppContext();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.sessionId) {
      setLoading(true);
      api.getHistory(state.sessionId)
        .then((res) => setPredictions(res.data.predictions || []))
        .catch(() => setPredictions([]))
        .finally(() => setLoading(false));
    }
  }, [state.sessionId, state.predictionResult]);

  return { predictions, loading };
}
