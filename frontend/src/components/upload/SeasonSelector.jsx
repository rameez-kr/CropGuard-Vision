import { Sun } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function SeasonSelector({ value, onChange }) {
  const { t } = useTranslation();

  const SEASONS = [
    { value: "auto", label: t("season.auto") },
    { value: "kharif", label: t("season.kharif") },
    { value: "rabi", label: t("season.rabi") },
    { value: "zaid", label: t("season.zaid") },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
        <Sun className="w-4 h-4" /> {t("season.label")}
      </label>
      <div className="flex flex-wrap gap-3">
        {SEASONS.map((s) => (
          <label key={s.value} className="flex items-center gap-1.5 text-sm cursor-pointer">
            <input type="radio" name="season" value={s.value}
              checked={value === s.value} onChange={() => onChange(s.value)}
              className="text-green-600 focus:ring-green-500"
            />
            {s.label}
          </label>
        ))}
      </div>
    </div>
  );
}
