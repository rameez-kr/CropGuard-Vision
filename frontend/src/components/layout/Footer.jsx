import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>Powered by Microsoft Azure AI Services</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/YOUR_USERNAME/CropGuard-Vision" target="_blank"
            rel="noopener noreferrer" className="hover:text-gray-800 flex items-center gap-1">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href="https://linkedin.com/in/YOUR_PROFILE" target="_blank"
            rel="noopener noreferrer" className="hover:text-gray-800 flex items-center gap-1">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
