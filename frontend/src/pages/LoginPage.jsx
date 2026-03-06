import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Leaf, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GOOGLE_CLIENT_ID } from "../constants/config";
import GoogleSignInButton from "../components/common/GoogleSignInButton";
import { useTranslation } from "../hooks/useTranslation";

export default function LoginPage() {
  const { login, googleLogin, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate(redirectTo);
  };

  const handleGoogleSuccess = async (accessToken) => {
    const ok = await googleLogin(accessToken);
    if (ok) navigate(redirectTo);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-green-700 mb-2">
            <Leaf className="w-8 h-8" />
            <span className="text-2xl font-bold">CropGuard Vision</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">{t("login.title")}</h1>
          <p className="text-gray-500 mt-1">{t("login.subtitle")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={clearError} className="text-red-400 hover:text-red-600 ml-2">&times;</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("login.email")}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                  placeholder={t("login.emailPlaceholder")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("login.password")}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                  placeholder={t("login.passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {loading ? t("login.submitting") : t("login.submitBtn")}
            </button>
          </form>

          {GOOGLE_CLIENT_ID && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-gray-400 uppercase tracking-wide">{t("login.orContinue")}</span>
                </div>
              </div>
              <GoogleSignInButton onSuccess={handleGoogleSuccess} text={t("login.googleBtn")} />
            </>
          )}

          <p className="mt-6 text-center text-sm text-gray-500">
            {t("login.noAccount")}{" "}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
              {t("login.createOne")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
