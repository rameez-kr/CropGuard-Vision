import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>{t("footer.powered")}</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/rameez-kr/CropGuard-Vision" target="_blank"
            rel="noopener noreferrer" className="hover:text-gray-800 flex items-center gap-1">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/abdul-rameez-k-r-3382a51a3" target="_blank"
            rel="noopener noreferrer" className="hover:text-gray-800 flex items-center gap-1">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
