import useHistory from "../hooks/useHistory";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Clock } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function HistoryPage() {
  const { predictions, loading } = useHistory();
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6" /> {t("history.title")}
      </h1>

      {loading && <LoadingSpinner message={t("history.loading")} />}

      {!loading && predictions.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">{t("history.empty")}</p>
          <p className="text-sm mt-1">{t("history.emptyHint")}</p>
        </div>
      )}

      <div className="space-y-3">
        {predictions.map((p) => (
          <div key={p.request_id}
            className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-4">
            {p.image_url && (
              <img src={p.image_url} alt="Leaf"
                className="w-14 h-14 object-cover rounded-lg" />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {p.disease.replace(/_/g, " ")}
              </p>
              <p className="text-sm text-gray-500">
                {p.crop_type} — {p.confidence}% {t("history.confidence")} — {p.language.toUpperCase()}
              </p>
            </div>
            <p className="text-xs text-gray-400">
              {new Date(p.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
