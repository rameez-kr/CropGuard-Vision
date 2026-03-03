import { AlertCircle } from "lucide-react";
import Button from "./Button";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center gap-4">
      <AlertCircle className="w-10 h-10 text-red-500" />
      <p className="text-red-700 text-center">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>Try Again</Button>
      )}
    </div>
  );
}
