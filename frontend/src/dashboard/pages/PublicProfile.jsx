import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  MessageSquare,
  Edit3,
  CheckCircle2,
  User,
  Loader2,
  AlertCircle,
  Globe,
  Clock,
} from "lucide-react";

export default function PublicProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res   = await fetch("/api/user/settings/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load profile.");
          return;
        }

        setProfile(data.user);
      } catch {
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto flex items-center justify-center py-32">
        <Loader2 size={28} className="animate-spin text-blue-600" />
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-16 flex flex-col items-center gap-3 text-center">
        <AlertCircle size={32} className="text-rose-400" />
        <p className="text-sm text-slate-600">{error}</p>
      </div>
    );
  }

  // ── Derived display values ───────────────────────────────────────────────
  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year:  "numeric",
      })
    : "—";

  const skillsTeach = Array.isArray(profile.skillsTeach) ? profile.skillsTeach : [];
  const languages   = Array.isArray(profile.languages)   ? profile.languages   : [];

  // Placeholder stats (real data requires swap/session features)
  const stats = [
    { label: "Swaps Completed", value: "—"  },
    { label: "Hours Taught",    value: "—"  },
    { label: "Mentor Rating",   value: "—", isRating: true },
    { label: "Reviews",         value: "—"  },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">

      {/* ── Top Banner Card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900" />

        <div className="px-6 pb-6 relative">
          {/* Avatar + actions row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">

            {/* Avatar */}
            <div className="w-28 h-28 rounded-2xl ring-4 ring-white shadow-md bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={48} strokeWidth={1.5} />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/settings"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </Link>
              <Link
                to="/dashboard/new-swap"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm shadow-blue-500/20"
              >
                <MessageSquare size={15} />
                <span>Request Swap</span>
              </Link>
            </div>
          </div>

          {/* Name & meta */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">
                {profile.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold flex items-center gap-1 border border-blue-100">
                <CheckCircle2 size={13} /> Verified Mentor
              </span>
            </div>

            {/* Username */}
            {profile.username && (
              <p className="text-sm font-semibold text-slate-500">
                @{profile.username}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              {profile.country && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-slate-400" />
                  {profile.country}
                </span>
              )}
              {profile.timezone && (
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-slate-400" />
                  {profile.timezone}
                </span>
              )}
              {languages.length > 0 && (
                <span className="flex items-center gap-1">
                  <Globe size={14} className="text-slate-400" />
                  {languages.join(", ")}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" />
                Joined {joinedDate}
              </span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio ? (
            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              {profile.bio}
            </p>
          ) : (
            <p className="mt-4 text-xs text-slate-400 italic">
              No bio yet.{" "}
              <Link to="/dashboard/settings" className="text-blue-500 hover:underline not-italic font-semibold">
                Add one in Settings →
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
            <p className="text-2xl font-black text-slate-900 flex items-center justify-center gap-1">
              {s.isRating && <Star size={18} className="text-amber-400 fill-amber-400" />}
              {s.value}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Skills Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Skills to teach */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600" />
            <span>Skills Can Teach</span>
          </h3>
          {skillsTeach.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsTeach.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              No skills added yet.{" "}
              <Link to="/dashboard/settings" className="text-blue-500 hover:underline not-italic font-semibold">
                Add in Settings →
              </Link>
            </p>
          )}
        </div>

        {/* Languages */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award size={18} className="text-purple-600" />
            <span>Languages</span>
          </h3>
          {languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100"
                >
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No languages listed.</p>
          )}
        </div>
      </div>

    </div>
  );
}
