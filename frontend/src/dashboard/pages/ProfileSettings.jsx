import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Camera,
  Check,
  Globe,
  Plus,
  X,
  ShieldCheck,
} from "lucide-react";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
  );

  const [formData, setFormData] = useState({
    fullName: "Muhammad Shayan",
    title: "Full-Stack Web Developer",
    email: "shayan@example.com",
    location: "Karachi, Pakistan",
    bio: "Passionate about building scalable web applications with modern tech.",
    teachingSkills: ["React.js", "Tailwind CSS", "Node.js"],
    learningSkills: ["Figma UI/UX", "SEO Strategy"],
  });

  const [newTeachSkill, setNewTeachSkill] = useState("");
  const [newLearnSkill, setNewLearnSkill] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const addSkill = (type) => {
    if (type === "teach" && newTeachSkill.trim()) {
      setFormData({
        ...formData,
        teachingSkills: [...formData.teachingSkills, newTeachSkill.trim()],
      });
      setNewTeachSkill("");
    } else if (type === "learn" && newLearnSkill.trim()) {
      setFormData({
        ...formData,
        learningSkills: [...formData.learningSkills, newLearnSkill.trim()],
      });
      setNewLearnSkill("");
    }
  };

  const removeSkill = (type, index) => {
    if (type === "teach") {
      setFormData({
        ...formData,
        teachingSkills: formData.teachingSkills.filter((_, i) => i !== index),
      });
    } else {
      setFormData({
        ...formData,
        learningSkills: formData.learningSkills.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Profile Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your account details, skills offered, and platform preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "general", label: "General Profile", icon: User },
          { id: "skills", label: "Skills Exchange", icon: Globe },
          { id: "security", label: "Security & Login", icon: Lock },
          { id: "notifications", label: "Notifications", icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* General Profile */}
      {activeTab === "general" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Avatar Upload */}
          <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group">
              <img
                src={avatarPreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900">Profile Picture</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                JPG, PNG or GIF. Recommended size: 300x300px.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bio / Introduction
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Skills Exchange */}
      {activeTab === "skills" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Skills to Teach */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skills I Can Teach
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill (e.g., Python)..."
                value={newTeachSkill}
                onChange={(e) => setNewTeachSkill(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => addSkill("teach")}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.teachingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill("teach", idx)}
                    className="hover:text-rose-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Skills to Learn */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skills I Want to Learn
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill (e.g., Graphic Design)..."
                value={newLearnSkill}
                onChange={(e) => setNewLearnSkill(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => addSkill("learn")}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.learningSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill("learn", idx)}
                    className="hover:text-rose-600 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 max-w-xl">
          <h4 className="text-sm font-bold text-slate-900">Change Password</h4>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Notifications Preferences */}
      {activeTab === "notifications" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Email Notifications</h4>

          <div className="space-y-3 text-xs">
            {[
              { title: "New Match Requests", desc: "Notify when someone asks to swap skills" },
              { title: "Session Reminders", desc: "Send reminder 1 hour before scheduled session" },
              { title: "Review Notifications", desc: "Notify when a partner leaves a review" },
            ].map((item, idx) => (
              <label
                key={idx}
                className="flex items-start justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Save Button Bar */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer">
          Cancel
        </button>
        <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 cursor-pointer">
          Save Changes
        </button>
      </div>
    </div>
  );
}