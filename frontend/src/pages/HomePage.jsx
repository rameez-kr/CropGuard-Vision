import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Camera, Brain, Pill, Volume2, ArrowRight } from "lucide-react";
import Button from "../components/common/Button";

const FEATURES = [
  { icon: Camera, title: "Snap a Photo", desc: "Upload or capture a leaf image" },
  { icon: Brain, title: "AI Detects", desc: "Custom Vision identifies the disease" },
  { icon: Pill, title: "Get Treatment", desc: "GPT-4o generates actionable advice" },
  { icon: Volume2, title: "Listen", desc: "Hear advice in your language" },
];

export default function HomePage() {
  const { state } = useAppContext();

  return (
    <div>
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Protect Your Crops with <span className="text-green-600">AI</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload a photo of a diseased crop leaf and get instant disease identification
            and treatment advice — in your language.
          </p>
          <Link to="/diagnose">
            <Button className="text-lg px-8 py-3">
              Start Diagnosis <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <f.icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Supported Crops</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {state.crops.map((crop) => (
              <div key={crop.id}
                className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
                <span className="text-3xl">{crop.icon}</span>
                <p className="font-medium text-gray-900 mt-2">{crop.name}</p>
                <p className="text-xs text-gray-500">{crop.diseases_count} diseases</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
