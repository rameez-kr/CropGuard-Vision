import { useState, useEffect, useCallback } from "react";
import { Users, FileText, BarChart3, Shield, CheckCircle, XCircle, Infinity, RefreshCw } from "lucide-react";
import api from "../services/api";
import { useTranslation } from "../hooks/useTranslation";

const TABS = ["users", "audit", "usage"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const { t } = useTranslation();

  const tabConfig = [
    { id: "users", icon: Users, label: t("admin.usersTab") },
    { id: "audit", icon: FileText, label: t("admin.auditTab") },
    { id: "usage", icon: BarChart3, label: t("admin.usageTab") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-7 h-7 text-green-700" />
        <h1 className="text-2xl font-bold text-gray-900">{t("admin.title")}</h1>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
        {tabConfig.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 flex-1 justify-center py-2.5 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === id
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "users" && <UsersTab />}
      {activeTab === "audit" && <AuditTab />}
      {activeTab === "usage" && <UsageTab />}
    </div>
  );
}

/* ── Users Tab ──────────────────────────────────────────── */

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const { t } = useTranslation();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAdminUsers();
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleAction = async (userId, action) => {
    setUpdating(userId);
    try {
      let body = {};
      switch (action) {
        case "approve":
          body = { status: "active", max_diagnoses: -1, access_requested: 0 };
          break;
        case "reject":
          body = { status: "rejected", access_requested: 0 };
          break;
        case "reset":
          body = { status: "active", max_diagnoses: 3, access_requested: 0 };
          break;
      }
      await api.updateAdminUser(userId, body);
      await fetchUsers();
    } catch (err) {
      console.error("Admin action failed", err);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">{t("loading.default")}</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.userName")}</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.userEmail")}</th>
            <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.userRole")}</th>
            <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.userStatus")}</th>
            <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.diagnoses")}</th>
            <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.actions")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((u) => (
            <tr key={u.id} className={u.access_requested ? "bg-amber-50" : ""}>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  {u.name}
                  {u.access_requested === 1 && (
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                      {t("admin.accessRequested")}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-gray-500">{u.email}</td>
              <td className="py-3 px-4 text-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {u.role}
                </span>
              </td>
              <td className="py-3 px-4 text-center">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  u.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {u.status}
                </span>
              </td>
              <td className="py-3 px-4 text-center font-mono text-gray-700">
                {u.prediction_count} / {u.max_diagnoses === -1 ? "∞" : u.max_diagnoses}
              </td>
              <td className="py-3 px-4">
                {u.role !== "admin" && (
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleAction(u.id, "approve")}
                      disabled={updating === u.id}
                      title={t("admin.approve")}
                      className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition-colors disabled:opacity-40"
                    >
                      <Infinity className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(u.id, "reject")}
                      disabled={updating === u.id}
                      title={t("admin.reject")}
                      className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAction(u.id, "reset")}
                      disabled={updating === u.id}
                      title={t("admin.resetQuota")}
                      className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-40"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Audit Tab ──────────────────────────────────────────── */

function AuditTab() {
  const [data, setData] = useState({ items: [], total: 0 });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const PAGE_SIZE = 25;

  const fetchAudit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.getAdminAudit({ limit: PAGE_SIZE, offset: page * PAGE_SIZE });
      setData(res.data);
    } catch (err) {
      console.error("Failed to load audit", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchAudit(); }, [fetchAudit]);

  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.auditDate")}</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.auditUser")}</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.auditCrop")}</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">{t("admin.auditDisease")}</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.auditConfidence")}</th>
              <th className="text-center py-3 px-4 font-medium text-gray-600">{t("admin.auditLang")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t("loading.default")}</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">{t("admin.noAuditData")}</td></tr>
            ) : data.items.map((item) => (
              <tr key={item.request_id}>
                <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <div className="text-gray-800">{item.user_name}</div>
                  <div className="text-xs text-gray-400">{item.user_email}</div>
                </td>
                <td className="py-3 px-4 capitalize">{item.crop_type}</td>
                <td className="py-3 px-4">{item.disease}</td>
                <td className="py-3 px-4 text-center font-mono">{item.confidence}%</td>
                <td className="py-3 px-4 text-center uppercase text-xs font-semibold">{item.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
          >
            {t("admin.prev")}
          </button>
          <span className="text-sm text-gray-500">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
          >
            {t("admin.next")}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Usage Tab ──────────────────────────────────────────── */

function UsageTab() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.getAdminUsage();
        setServices(res.data.services);
      } catch (err) {
        console.error("Failed to load usage", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const SERVICE_LABELS = {
    custom_vision: "Custom Vision",
    image_analysis: "Image Analysis",
    openai: "Azure OpenAI",
    content_safety: "Content Safety",
    translator: "Translator",
    speech: "Speech",
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-500">{t("loading.default")}</div>;
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">{t("admin.noUsageData")}</div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((svc) => (
        <div key={svc.service} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            {SERVICE_LABELS[svc.service] || svc.service}
          </h3>
          <p className="text-3xl font-bold text-gray-900 mb-4">{svc.total.toLocaleString()}</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">{t("admin.usageToday")}</span>
              <span className="font-mono text-gray-700">{svc.today}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t("admin.usageWeek")}</span>
              <span className="font-mono text-gray-700">{svc.this_week}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{t("admin.usageMonth")}</span>
              <span className="font-mono text-gray-700">{svc.this_month}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
