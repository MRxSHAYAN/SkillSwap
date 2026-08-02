import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, Shield, Bell, Sliders, Camera, Check,
  Eye, EyeOff, Save, Loader2, AlertCircle, Trash2,
} from "lucide-react";

const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: `Bearer ${token}` },
  });
};

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");

  const [user, setUser] = useState({ fullName: "", username: "", email: "", bio: "", timezone: "", avatarUrl: null });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  const [notifs, setNotifs] = useState({ emailSwaps: true, emailMessages: true, emailReminders: true, marketingUpdates: false });
  const [swapPrefs, setSwapPrefs] = useState({ acceptProposals: true, meetingLink: "" });

  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSaving, setPassSaving] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    authFetch("/api/user/settings/me")
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) { setError(data.message || "Failed to load profile."); return; }
        const u = data.user;
        setUser({ fullName: u.fullName || "", username: u.username || "", email: u.email || "", bio: u.bio || "", timezone: u.timezone || "", avatarUrl: u.avatarUrl || null });
        if (u.notificationPrefs) setNotifs((n) => ({ ...n, ...u.notificationPrefs }));
        if (u.swapPrefs) setSwapPrefs((s) => ({ ...s, ...u.swapPrefs }));
      })
      .catch(() => setError("Unable to connect to server."))
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const showBanner = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setError("Image must be under 2MB."); return; }
    setAvatarFile(file); setAvatarPreview(URL.createObjectURL(file)); setError("");
  };

  const handleSaveAccount = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSaved(false);
    try {
      const body = new FormData();
      body.append("fullName", user.fullName); body.append("username", user.username);
      body.append("email", user.email); body.append("bio", user.bio); body.append("timezone", user.timezone);
      if (avatarFile) body.append("avatar", avatarFile);
      const res = await authFetch("/api/user/settings/me", { method: "PUT", body });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to save changes."); return; }
      const stored = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...stored, ...data.user }));
      window.dispatchEvent(new Event("userUpdated"));
      setAvatarFile(null);
      setUser({ fullName: data.user.fullName || "", username: data.user.username || "", email: data.user.email || "", bio: data.user.bio || "", timezone: data.user.timezone || "", avatarUrl: data.user.avatarUrl || null });
      showBanner();
    } catch { setError("Unable to connect to server."); }
    finally { setSaving(false); }
  };

  const handleSavePrefs = async (e) => {
    e.preventDefault(); setSaving(true); setError(""); setSaved(false);
    try {
      const res = await authFetch("/api/user/settings/me/prefs", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationPrefs: notifs, swapPrefs }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Failed to save preferences."); return; }
      if (data.notificationPrefs) setNotifs((n) => ({ ...n, ...data.notificationPrefs }));
      if (data.swapPrefs) setSwapPrefs((s) => ({ ...s, ...data.swapPrefs }));
      showBanner();
    } catch { setError("Unable to connect to server."); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault(); setPassError("");
    if (passwords.newPassword.length < 6) { setPassError("New password must be at least 6 characters."); return; }
    setPassSaving(true);
    try {
      const res = await authFetch("/api/user/settings/me/password", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (!res.ok) { setPassError(data.message || "Failed to update password."); return; }
      setPasswords({ currentPassword: "", newPassword: "" });
      showBanner();
    } catch { setPassError("Unable to connect to server."); }
    finally { setPassSaving(false); }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) { setDeleteError("Please enter your password to confirm."); return; }
    setDeleting(true); setDeleteError("");
    try {
      const res = await authFetch("/api/user/settings/me", {
        method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await res.json();
      if (!res.ok) { setDeleteError(data.message || "Failed to delete account."); return; }
      localStorage.removeItem("token"); localStorage.removeItem("user");
      navigate("/register", { replace: true });
    } catch { setDeleteError("Unable to connect to server."); }
    finally { setDeleting(false); }
  };

  const displayAvatar = avatarPreview || user.avatarUrl;

  if (loading) return (
    <div className="max-w-4xl mx-auto flex items-center justify-center py-32">
      <Loader2 size={28} className="animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your account, preferences, and security.</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Check size={14} /><span>Changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Global error */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle size={15} className="shrink-0" /><span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: "account", label: "Account & Profile", icon: User },
          { id: "preferences", label: "Swap Preferences", icon: Sliders },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "security", label: "Security", icon: Shield },
        ].map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${activeTab === id ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
            <Icon size={15} /><span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB 1: ACCOUNT ─────────────────────────────────────────────────── */}
      {activeTab === "account" && (
        <form onSubmit={handleSaveAccount} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 group">
                {displayAvatar
                  ? <img src={displayAvatar} alt={user.fullName || "Avatar"} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-slate-400"><User size={28} /></div>
                }
                <label className="absolute inset-0 bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={16} />
                  <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Profile Photo</h3>
                <p className="text-xs text-slate-500 mt-0.5">JPG or PNG, max 2MB. Hover to change.</p>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { label: "Full Name", key: "fullName", type: "text", required: true, placeholder: "" },
                { label: "Username", key: "username", type: "text", required: false, placeholder: "e.g. mshayan_dev" },
                { label: "Email Address", key: "email", type: "email", required: true, placeholder: "" },
                { label: "Timezone", key: "timezone", type: "text", required: false, placeholder: "e.g. UTC +5:00 (PKT)" },
              ].map(({ label, key, type, required, placeholder }) => (
                <div key={key}>
                  <label className="block font-semibold text-slate-700 mb-1.5">{label}</label>
                  <input type={type} value={user[key]} onChange={(e) => setUser({ ...user, [key]: e.target.value })}
                    required={required} placeholder={placeholder} maxLength={key === "username" ? 30 : undefined}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Short Bio <span className="font-normal text-slate-400">({user.bio.length}/300)</span>
                </label>
                <textarea rows={3} value={user.bio} maxLength={300} placeholder="Tell others what you're about..."
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors cursor-pointer">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 2: SWAP PREFERENCES ────────────────────────────────────────── */}
      {activeTab === "preferences" && (
        <form onSubmit={handleSavePrefs} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-slate-900">Availability & Session Settings</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <p className="font-semibold text-slate-800">Accept New Swap Proposals</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Allow others to discover your profile and send swap requests.</p>
                </div>
                <input type="checkbox" checked={swapPrefs.acceptProposals}
                  onChange={(e) => setSwapPrefs({ ...swapPrefs, acceptProposals: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <p className="font-semibold text-slate-800">Default Meeting Link</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Your preferred Google Meet or Zoom link for sessions.</p>
                </div>
                <input type="url" value={swapPrefs.meetingLink} placeholder="https://meet.google.com/..."
                  onChange={(e) => setSwapPrefs({ ...swapPrefs, meetingLink: e.target.value })}
                  className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors cursor-pointer">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? "Saving..." : "Save Preferences"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 3: NOTIFICATIONS ───────────────────────────────────────────── */}
      {activeTab === "notifications" && (
        <form onSubmit={handleSavePrefs} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Email Preferences</h3>
            <div className="divide-y divide-slate-100 text-xs">
              {[
                { key: "emailSwaps", title: "Swap Requests & Confirmations", desc: "Get notified when someone proposes or accepts a swap." },
                { key: "emailMessages", title: "Direct Messages", desc: "Receive email alerts for unread chat messages." },
                { key: "emailReminders", title: "Upcoming Session Reminders", desc: "Get reminded 1 hour before scheduled sessions." },
                { key: "marketingUpdates", title: "Community News & Tips", desc: "Occasional updates about platform improvements." },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 cursor-pointer">
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <input type="checkbox" checked={notifs[item.key]}
                    onChange={(e) => setNotifs({ ...notifs, [item.key]: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer" />
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors cursor-pointer">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? "Saving..." : "Save Notifications"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 4: SECURITY ────────────────────────────────────────────────── */}
      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Change Password */}
          <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Change Password</h3>
            {passError && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle size={13} className="shrink-0" /><span>{passError}</span>
              </div>
            )}
            <div className="space-y-3 max-w-md text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input type={showCurrentPass ? "text" : "password"} value={passwords.currentPassword} required
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500" />
                  <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                <div className="relative">
                  <input type={showNewPass ? "text" : "password"} value={passwords.newPassword} required minLength={6}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500" />
                  <button type="button" onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={passSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors cursor-pointer">
                {passSaving ? <Loader2 size={14} className="animate-spin" /> : null}
                <span>{passSaving ? "Updating..." : "Update Password"}</span>
              </button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 space-y-3">
            <h3 className="text-sm font-semibold text-rose-900">Danger Zone</h3>
            <p className="text-xs text-rose-700">Permanently remove your profile, skill history, and earned credits. This cannot be undone.</p>
            <button type="button" onClick={() => { setShowDeleteModal(true); setDeleteError(""); setDeletePassword(""); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer">
              <Trash2 size={15} /><span>Delete Account</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Account Confirmation Modal ──────────────────────────────── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 w-full max-w-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Confirm Account Deletion</h3>
            <p className="text-xs text-slate-600">This is irreversible. Enter your password to permanently delete your account.</p>
            {deleteError && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                <AlertCircle size={13} className="shrink-0" /><span>{deleteError}</span>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your Password</label>
              <input type="password" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-rose-500" />
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button type="button" onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="button" onClick={handleDeleteAccount} disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-semibold transition-colors cursor-pointer">
                {deleting ? <Loader2 size={13} className="animate-spin" /> : null}
                <span>{deleting ? "Deleting..." : "Delete Forever"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
