import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Sliders,
  Camera,
  Check,
  Eye,
  EyeOff,
  Globe,
  Trash2,
  Save,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  // Account State
  const [user, setUser] = useState({
    name: "Muhammad Shayan",
    email: "shayan@example.com",
    username: "mshayan_dev",
    bio: "Full-stack developer looking to exchange React skills for UI/UX & Python.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    timezone: "UTC +5:00 (Pakistan Standard Time)",
  });

  // Password State
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Notification Toggles State
  const [notifs, setNotifs] = useState({
    emailSwaps: true,
    emailMessages: true,
    emailReminders: true,
    marketingUpdates: false,
  });

  // Saved Feedback Banner State
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your account, profile preferences, and security options.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <Check size={14} />
            <span>Changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: "account", label: "Account & Profile", icon: User },
          { id: "preferences", label: "Swap Preferences", icon: Sliders },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "security", label: "Security", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACCOUNT & PROFILE */}
      {activeTab === "account" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-slate-900/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={16} />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">Profile Photo</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  JPG or PNG, max size 2MB.
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Timezone
                </label>
                <input
                  type="text"
                  value={user.timezone}
                  onChange={(e) => setUser({ ...user, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Short Bio
                </label>
                <textarea
                  rows={3}
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SWAP PREFERENCES */}
      {activeTab === "preferences" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Availability & Session Settings
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <p className="font-semibold text-slate-800">Accept New Swap Proposals</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Allow other users to discover your profile and send swap requests.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <p className="font-semibold text-slate-800">Default Meeting Link</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Your preferred Google Meet or Zoom link for sessions.
                  </p>
                </div>
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  className="w-64 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save size={15} />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Email Preferences</h3>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                {
                  key: "emailSwaps",
                  title: "Swap Requests & Confirmations",
                  desc: "Get notified when someone proposes or accepts a swap.",
                },
                {
                  key: "emailMessages",
                  title: "Direct Messages",
                  desc: "Receive email alerts for unread chat messages.",
                },
                {
                  key: "emailReminders",
                  title: "Upcoming Session Reminders",
                  desc: "Get reminded 1 hour before scheduled 1-on-1 sessions.",
                },
                {
                  key: "marketingUpdates",
                  title: "Community News & Tips",
                  desc: "Occasional updates about platform improvements.",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifs[item.key]}
                    onChange={(e) =>
                      setNotifs({ ...notifs, [item.key]: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save size={15} />
              <span>Save Notification Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Change Password</h3>

            <div className="space-y-3 max-w-md text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 space-y-3">
            <h3 className="text-sm font-semibold text-rose-900">Danger Zone</h3>
            <p className="text-xs text-rose-700">
              Permanently remove your profile, skill history, and earned credits.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Trash2 size={15} />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}