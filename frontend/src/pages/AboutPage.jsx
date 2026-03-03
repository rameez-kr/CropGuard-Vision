import { Cloud, Brain, Eye, MessageSquare, Shield, Volume2 } from "lucide-react";

const SERVICES = [
  { icon: Eye, name: "Azure AI Custom Vision", role: "Disease classification from leaf images" },
  { icon: Eye, name: "Azure AI Vision", role: "Scene validation (is it a plant?)" },
  { icon: Brain, name: "Azure OpenAI (GPT-4o-mini)", role: "Treatment advice generation" },
  { icon: Volume2, name: "Azure AI Speech", role: "Voice input and output" },
  { icon: MessageSquare, name: "Azure AI Language", role: "Translation to farmer's language" },
  { icon: Shield, name: "Azure AI Content Safety", role: "Filter harmful AI outputs" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">How CropGuard Vision Works</h1>

      <p className="text-gray-600 mb-8">
        CropGuard Vision uses 6 Microsoft Azure AI services to provide instant crop disease
        detection and treatment advice for farmers worldwide.
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-green-800 mb-3">The AI Pipeline</h2>
        <ol className="space-y-2 text-sm text-green-700">
          <li>1. Farmer uploads a leaf photo</li>
          <li>2. Azure AI Vision verifies it is a plant image</li>
          <li>3. Azure Custom Vision classifies the disease (15 classes, 90%+ accuracy)</li>
          <li>4. Azure OpenAI generates structured treatment advice</li>
          <li>5. Azure Content Safety screens the advice</li>
          <li>6. Azure Language translates to the farmer&apos;s language</li>
          <li>7. Azure Speech converts advice to audio</li>
        </ol>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5" /> Azure Services Used
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {SERVICES.map((s) => (
          <div key={s.name} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <s.icon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-900 text-sm">{s.name}</p>
              <p className="text-gray-500 text-xs">{s.role}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 space-y-1">
        <p><strong>Frontend:</strong> React 18 + Vite + Tailwind CSS (PWA)</p>
        <p><strong>Backend:</strong> Python FastAPI</p>
        <p><strong>AI Model:</strong> Azure Custom Vision (trained on PlantVillage dataset)</p>
        <p><strong>Hosting:</strong> Azure App Service + Azure Static Web Apps</p>
        <p><strong>CI/CD:</strong> GitHub Actions</p>
      </div>
    </div>
  );
}
