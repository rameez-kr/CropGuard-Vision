import { Sun } from "lucide-react";

const SEASONS = [
  { value: "auto", label: "Auto-detect" },
  { value: "kharif", label: "Kharif (Jun–Oct)" },
  { value: "rabi", label: "Rabi (Nov–Mar)" },
  { value: "zaid", label: "Zaid (Apr–May)" },
];

export default function SeasonSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
        <Sun className="w-4 h-4" /> Season
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
