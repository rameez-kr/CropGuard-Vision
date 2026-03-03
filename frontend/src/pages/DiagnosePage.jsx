import { useState } from "react";
import ImageUploader from "../components/upload/ImageUploader";
import CropSelector from "../components/upload/CropSelector";
import SeasonSelector from "../components/upload/SeasonSelector";
import VoiceInput from "../components/voice/VoiceInput";
import DiseaseCard from "../components/results/DiseaseCard";
import TreatmentPanel from "../components/results/TreatmentPanel";
import SceneTags from "../components/results/SceneTags";
import AudioPlayer from "../components/voice/AudioPlayer";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorAlert from "../components/common/ErrorAlert";
import Disclaimer from "../components/common/Disclaimer";
import Button from "../components/common/Button";
import usePrediction from "../hooks/usePrediction";
import useVoice from "../hooks/useVoice";
import { Search } from "lucide-react";

export default function DiagnosePage() {
  const [imageFile, setImageFile] = useState(null);
  const [cropType, setCropType] = useState("tomato");
  const [season, setSeason] = useState("auto");

  const { predict, result, isLoading, error } = usePrediction();
  const { sendVoice, voiceResult } = useVoice();

  function handleSubmit() {
    if (imageFile) predict(imageFile, cropType, season);
  }

  function handleReset() {
    setImageFile(null);
    setCropType("tomato");
    setSeason("auto");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Diagnose Your Crop</h1>

      {!result && !isLoading && (
        <div className="space-y-5">
          <ImageUploader onImageSelect={setImageFile} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CropSelector value={cropType} onChange={setCropType} />
            <SeasonSelector value={season} onChange={setSeason} />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-2">Or ask by voice:</p>
            <VoiceInput onRecordingComplete={(blob) => sendVoice(blob)} />
          </div>

          <Button onClick={handleSubmit} disabled={!imageFile}
            className="w-full py-3 text-base">
            <Search className="w-5 h-5" /> Analyze Crop
          </Button>

          {error && <ErrorAlert message={error} onRetry={handleReset} />}
        </div>
      )}

      {isLoading && <LoadingSpinner message="Analyzing your crop leaf..." />}

      {result && (
        <div>
          <DiseaseCard disease={result.disease} imageUrl={result.image_url} />
          <SceneTags tags={result.scene_analysis?.tags} />
          <TreatmentPanel treatment={result.treatment} />
          <AudioPlayer audioUrl={result.audio_url} />
          <Disclaimer />

          <div className="mt-6 text-center">
            <Button variant="secondary" onClick={handleReset}>
              Diagnose Another Crop
            </Button>
          </div>
        </div>
      )}

      {voiceResult && !result && (
        <div className="mt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 font-medium">You said:</p>
            <p className="text-blue-700 italic">&quot;{voiceResult.transcription.text}&quot;</p>
          </div>
          <TreatmentPanel treatment={{ text: voiceResult.advice.text, was_translated: false }} />
          <AudioPlayer audioUrl={voiceResult.audio_response?.url} />
          <Disclaimer />
        </div>
      )}
    </div>
  );
}
