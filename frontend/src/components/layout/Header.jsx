import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import LanguagePicker from "../common/LanguagePicker";

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/diagnose", label: "Diagnose" },
    { to: "/history", label: "History" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-green-700 font-bold text-lg">
          <Leaf className="w-6 h-6" />
          CropGuard Vision
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link key={link.to} to={link.to}
              className={`text-sm font-medium transition-colors ${
                pathname === link.to ? "text-green-700" : "text-gray-600 hover:text-green-600"
              }`}
            >{link.label}</Link>
          ))}
          <LanguagePicker />
        </nav>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {links.map((link) => (
            <Link key={link.to} to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-green-600"
            >{link.label}</Link>
          ))}
          <div className="pt-2"><LanguagePicker /></div>
        </nav>
      )}
    </header>
  );
}
