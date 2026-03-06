import { useState, useRef } from "react";
import { Upload, Camera, X } from "lucide-react";
import { MAX_IMAGE_SIZE_MB } from "../../constants/config";
import { useTranslation } from "../../hooks/useTranslation";

export default function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const ACCEPTED = ["image/jpeg", "image/png"];

  function handleFile(file) {
    setError(null);
    if (!ACCEPTED.includes(file.type)) {
      setError(t("upload.errFormat"));
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setError(t("upload.errSize").replace("{size}", MAX_IMAGE_SIZE_MB));
      return;
    }
    setPreview(URL.createObjectURL(file));
    onImageSelect(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  function handleRemove() {
    setPreview(null);
    setError(null);
    onImageSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  if (preview) {
    return (
      <div className="border-2 border-green-300 bg-green-50 rounded-xl p-4 flex items-center gap-4">
        <img src={preview} alt="Selected leaf" className="w-24 h-24 object-cover rounded-lg" />
        <div className="flex-1">
          <p className="text-sm text-green-800 font-medium">{t("upload.selected")}</p>
          <p className="text-xs text-green-600">{t("upload.ready")}</p>
        </div>
        <button onClick={handleRemove} className="p-2 hover:bg-green-100 rounded-full"
          aria-label="Remove image">
          <X className="w-5 h-5 text-green-700" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragOver
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
        }`}
        role="button" tabIndex={0} aria-label="Upload image"
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 font-medium">{t("upload.dragDrop")}</p>
        <p className="text-gray-400 text-sm mt-1">{t("upload.browse").replace("{size}", MAX_IMAGE_SIZE_MB)}</p>

        <input ref={inputRef} type="file" accept="image/jpeg,image/png" className="hidden"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          data-testid="file-input"
        />
      </div>

      <button onClick={() => inputRef.current?.click()}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 md:hidden">
        <Camera className="w-4 h-4" /> {t("upload.camera")}
      </button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
