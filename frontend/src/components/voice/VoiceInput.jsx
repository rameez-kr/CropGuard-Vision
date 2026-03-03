import { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import audioService from "../../services/audioService";
import { MAX_VOICE_DURATION_SECONDS } from "../../constants/config";

export default function VoiceInput({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  async function startRecording() {
    try {
      await audioService.start();
      setIsRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert("Microphone access is required for voice input.");
    }
  }

  async function stopRecording() {
    clearInterval(timerRef.current);
    setIsRecording(false);
    const blob = await audioService.stop();
    onRecordingComplete(blob);
  }

  useEffect(() => {
    if (isRecording && seconds >= MAX_VOICE_DURATION_SECONDS) {
      stopRecording();
    }
  }, [seconds, isRecording]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="flex items-center gap-3">
      {isRecording ? (
        <button onClick={stopRecording}
          className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center animate-pulse">
          <Square className="w-6 h-6" />
        </button>
      ) : (
        <button onClick={startRecording}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center">
          <Mic className="w-6 h-6" />
        </button>
      )}
      <div className="text-sm text-gray-600">
        {isRecording ? (
          <span className="text-red-600 font-medium">Recording... {seconds}s / {MAX_VOICE_DURATION_SECONDS}s</span>
        ) : (
          <span>Tap to speak your symptoms</span>
        )}
      </div>
    </div>
  );
}
