import { AlertTriangle } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function Disclaimer() {
  const { t } = useTranslation();

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 mt-4">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <p className="text-amber-700 text-sm">
        <strong>{t("disclaimer.title")}</strong> {t("disclaimer.text")}
      </p>
    </div>
  );
}
