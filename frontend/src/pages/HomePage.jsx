import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Camera, Brain, Pill, Volume2, ArrowRight } from "lucide-react";
import Button from "../components/common/Button";
import { useTranslation } from "../hooks/useTranslation";

export default function HomePage() {
  const { state } = useAppContext();
  const { t } = useTranslation();

  const FEATURES = [
    { icon: Camera, title: t("home.feature1Title"), desc: t("home.feature1Desc") },
    { icon: Brain, title: t("home.feature2Title"), desc: t("home.feature2Desc") },
    { icon: Pill, title: t("home.feature3Title"), desc: t("home.feature3Desc") },
    { icon: Volume2, title: t("home.feature4Title"), desc: t("home.feature4Desc") },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("home.title")} <span className="text-green-600">{t("home.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t("home.subtitle")}
          </p>
          <Link to="/diagnose">
            <Button className="text-lg px-8 py-3">
              {t("home.cta")} <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{t("home.howItWorks")}</h2>
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
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{t("home.supportedCrops")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {state.crops.map((crop) => (
              <Link key={crop.id} to={`/crops/${crop.id}`}
                className="bg-white rounded-lg border border-gray-200 p-4 text-center hover:shadow-md hover:border-green-300 transition-all cursor-pointer">
                <span className="text-3xl">{crop.icon}</span>
                <p className="font-medium text-gray-900 mt-2">{crop.name}</p>
                <p className="text-xs text-gray-500">{crop.diseases_count} {t("home.diseases")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
