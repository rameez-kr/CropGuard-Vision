import { useTranslation } from "../../hooks/useTranslation";

export default function ConfidenceMeter({ value, level }) {
  const { t } = useTranslation();

  const colors = {
    high: "bg-green-500",
    medium: "bg-amber-500",
    low: "bg-red-500",
  };

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{t("confidence.label")}</span>
        <span className="font-medium">{value}% — {level.toUpperCase()}</span>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colors[level] || colors.low}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
