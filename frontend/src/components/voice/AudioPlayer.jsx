import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { t } = useTranslation();

  function toggle() {
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play(); }
    setPlaying(!playing);
  }

  if (!audioUrl) return null;

  return (
    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-3">
      <button onClick={toggle}
        className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700">
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>
      <span className="text-sm text-green-800">{t("audio.listen")}</span>
      <audio ref={audioRef} src={audioUrl}
        onEnded={() => setPlaying(false)} preload="auto" />
    </div>
  );
}
