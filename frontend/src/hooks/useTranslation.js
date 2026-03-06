import { useAppContext } from "../context/AppContext";
import { translations } from "../i18n/translations";

export function useTranslation() {
  const { state } = useAppContext();
  const lang = state.language || "en";

  const t = (key, fallback) =>
    translations[lang]?.[key] || translations.en?.[key] || fallback || key;

  return { t, lang };
}
