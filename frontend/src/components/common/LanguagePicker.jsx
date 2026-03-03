import { useAppContext } from "../../context/AppContext";
import { Globe } from "lucide-react";

export default function LanguagePicker() {
  const { state, dispatch } = useAppContext();

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <select
        value={state.language}
        onChange={(e) => dispatch({ type: "SET_LANGUAGE", payload: e.target.value })}
        className="bg-transparent border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-200"
        aria-label="Select language"
      >
        {state.languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.name}</option>
        ))}
      </select>
    </div>
  );
}
