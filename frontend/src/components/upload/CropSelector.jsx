import { useAppContext } from "../../context/AppContext";
import { Sprout } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function CropSelector({ value, onChange }) {
  const { state } = useAppContext();
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
        <Sprout className="w-4 h-4" /> {t("crop.label")}
      </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200"
      >
        {state.crops.map((crop) => (
          <option key={crop.id} value={crop.id}>
            {crop.icon} {crop.name} ({crop.diseases_count} {t("crop.diseases")})
          </option>
        ))}
      </select>
    </div>
  );
}
