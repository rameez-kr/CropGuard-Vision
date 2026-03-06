import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Bug, Search, Leaf } from "lucide-react";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";
import { useTranslation } from "../hooks/useTranslation";

export default function CropDetailPage() {
  const { cropId } = useParams();
  const { t } = useTranslation();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .getCropDetail(cropId)
      .then((res) => setCrop(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cropId]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <LoadingSpinner message={t("cropDetail.loading")} />
      </div>
    );
  }

  if (error || !crop) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700">{t("cropDetail.notFound")}</p>
        <p className="text-sm text-gray-500 mt-1">{t("cropDetail.notFoundHint")}</p>
        <Link to="/" className="inline-block mt-6">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4" /> {t("cropDetail.backToCrops")}
          </Button>
        </Link>
      </div>
    );
  }

  const diseases = crop.diseases || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {t("cropDetail.backToCrops")}
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{crop.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{crop.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {t("cropDetail.diseasesCount").replace("{count}", diseases.length)}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <Link to={`/diagnose?crop=${crop.id}`}>
            <Button className="px-6 py-2.5">
              <Search className="w-4 h-4" /> {t("cropDetail.diagnoseThis")}
            </Button>
          </Link>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Bug className="w-5 h-5 text-red-500" /> {t("cropDetail.knownDiseases")}
      </h2>

      {diseases.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">{t("cropDetail.noDiseasesTitle")}</p>
          <p className="text-sm mt-1">{t("cropDetail.noDiseasesHint")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {diseases.map((d) => {
            const isHealthy = d.tag_name.toLowerCase().includes("healthy");
            return (
              <div
                key={d.id}
                className={`rounded-xl border p-4 flex items-start gap-3 ${
                  isHealthy
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200 hover:shadow-md transition-shadow"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isHealthy
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {isHealthy ? (
                    <Leaf className="w-4 h-4" />
                  ) : (
                    <Bug className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {d.display_name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">
                    {d.tag_name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
