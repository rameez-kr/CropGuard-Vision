import { Cloud, Brain, Eye, MessageSquare, Shield, Volume2 } from "lucide-react";
import { useTranslation } from "../hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();

  const SERVICES = [
    { icon: Eye, name: t("about.svc1Name"), role: t("about.svc1Role") },
    { icon: Eye, name: t("about.svc2Name"), role: t("about.svc2Role") },
    { icon: Brain, name: t("about.svc3Name"), role: t("about.svc3Role") },
    { icon: Volume2, name: t("about.svc4Name"), role: t("about.svc4Role") },
    { icon: MessageSquare, name: t("about.svc5Name"), role: t("about.svc5Role") },
    { icon: Shield, name: t("about.svc6Name"), role: t("about.svc6Role") },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("about.title")}</h1>

      <p className="text-gray-600 mb-8">
        {t("about.intro")}
      </p>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-green-800 mb-3">{t("about.pipelineTitle")}</h2>
        <ol className="space-y-2 text-sm text-green-700">
          <li>{t("about.step1")}</li>
          <li>{t("about.step2")}</li>
          <li>{t("about.step3")}</li>
          <li>{t("about.step4")}</li>
          <li>{t("about.step5")}</li>
          <li>{t("about.step6")}</li>
          <li>{t("about.step7")}</li>
        </ol>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Cloud className="w-5 h-5" /> {t("about.servicesTitle")}
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

      <h2 className="text-xl font-bold text-gray-900 mb-4">{t("about.techTitle")}</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 space-y-1">
        <p><strong>Frontend:</strong> {t("about.techFrontend")}</p>
        <p><strong>Backend:</strong> {t("about.techBackend")}</p>
        <p><strong>AI Model:</strong> {t("about.techAI")}</p>
        <p><strong>Hosting:</strong> {t("about.techHosting")}</p>
        <p><strong>CI/CD:</strong> {t("about.techCICD")}</p>
      </div>
    </div>
  );
}
