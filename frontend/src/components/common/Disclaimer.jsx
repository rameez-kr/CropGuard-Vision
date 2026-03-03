import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 mt-4">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <p className="text-amber-700 text-sm">
        <strong>AI-generated advice.</strong> This is not a substitute for professional
        agricultural consultation. Always verify with a local agronomist before applying treatments.
      </p>
    </div>
  );
}
