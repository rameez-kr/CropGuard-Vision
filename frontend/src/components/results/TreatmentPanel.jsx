import ReactMarkdown from "react-markdown";
import { ClipboardCopy, Volume2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";

export default function TreatmentPanel({ treatment, onListenClick }) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  function handleCopy() {
    navigator.clipboard.writeText(treatment.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{t("treatment.title")}</h3>
        <div className="flex gap-2">
          {treatment.was_translated && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {t("treatment.translated")}
            </span>
          )}
          <button onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title={t("treatment.copy")}>
            <ClipboardCopy className="w-4 h-4" />
          </button>
          {onListenClick && (
            <button onClick={onListenClick}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title={t("treatment.listen")}>
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {copied && <p className="text-green-600 text-xs mb-2">{t("treatment.copied")}</p>}
      <div className="prose prose-sm max-w-none prose-headings:text-green-800 prose-strong:text-gray-900">
        <ReactMarkdown>{treatment.text}</ReactMarkdown>
      </div>
    </div>
  );
}
