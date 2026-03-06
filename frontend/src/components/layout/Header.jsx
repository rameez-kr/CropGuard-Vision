import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, LogIn, LogOut, UserCircle, Shield } from "lucide-react";
import { useState } from "react";
import LanguagePicker from "../common/LanguagePicker";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/diagnose", label: t("nav.diagnose") },
    { to: "/history", label: t("nav.history") },
    { to: "/about", label: t("nav.about") },
    ...(isAdmin ? [{ to: "/admin", label: t("nav.admin"), icon: Shield }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

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

          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="flex items-center gap-1.5 text-sm text-gray-700">
                <UserCircle className="w-5 h-5 text-green-600" />
                {user?.name?.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <LogIn className="w-4 h-4" />
              {t("nav.signin")}
            </Link>
          )}
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
          <div className="pt-2 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="flex items-center justify-between py-2">
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  <UserCircle className="w-5 h-5 text-green-600" />
                  {user?.name}
                </span>
                <button onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium">
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-green-600 text-white rounded-lg text-sm font-medium">
                  {t("nav.signin")}
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center py-2 border border-green-600 text-green-600 rounded-lg text-sm font-medium">
                  {t("nav.signup")}
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
