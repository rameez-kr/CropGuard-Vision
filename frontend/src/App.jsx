import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import DiagnosePage from "./pages/DiagnosePage";
import HistoryPage from "./pages/HistoryPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CropDetailPage from "./pages/CropDetailPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";
import { GOOGLE_CLIENT_ID } from "./constants/config";

function AppShell() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/crops/:cropId" element={<CropDetailPage />} />
              <Route path="/diagnose" element={<ProtectedRoute><DiagnosePage /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default function App() {
  if (GOOGLE_CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppShell />
      </GoogleOAuthProvider>
    );
  }
  return <AppShell />;
}
