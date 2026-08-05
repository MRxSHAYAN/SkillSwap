import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Users,
  Clock,
  Star,
  Plus,
  Calendar,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Zap,
  Award,
  ChevronRight,
  TrendingUp,
  Search,
  AlertCircle,
  Inbox,
} from "lucide-react";

// ─── Skeleton Components ──────────────────────────────────────────────────────
function StatSkeleton() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-2xl bg-slate-200" />
        <div className="w-16 h-5 rounded-lg bg-slate-200" />
      </div>
      <div className="w-14 h-8 rounded-lg bg-slate-200 mb-2" />
      <div className="w-28 h-3 rounded bg-slate-200 mb-1" />
      <div className="w-20 h-3 rounded bg-slate-100" />
    </div>
  );
}

function ExchangeCardSkeleton() {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="h-3 w-28 rounded bg-slate-100" />
        </div>
        <div className="h-5 w-16 rounded-full bg-slate-200" />
      </div>
      <div className="h-12 rounded-xl bg-slate-100" />
      <div className="flex justify-end gap-2">
        <div className="h-8 w-24 rounded-xl bg-slate-200" />
        <div className="h-8 w-20 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-32 rounded bg-slate-200" />
            <div className="h-3 w-48 rounded bg-slate-100" />
            <div className="h-4 w-36 rounded-md bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyExchanges() {
  return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
        <Inbox size={26} className="text-blue-500" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">No active exchanges yet</h4>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          Post your first swap offer or explore skills to find your ideal learning partner.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Link
          to="/dashboard/new-swap"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={13} />
          Create Swap Offer
        </Link>
        <Link
          to="/dashboard/explore"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
        >
          <Search size={13} />
          Explore Skills
        </Link>
      </div>
    </div>
  );
}

// ─── Stat card config (static icon/badge/accent, values come from API) ────────
const STAT_CONFIG = [
  {
    key:    "swapsCompleted",
    name:   "Swaps Completed",
    icon:   BookOpen,
    badge:  "Mentor",
    accent: "from-blue-500 to-indigo-600",
    format: (v) => String(v).padStart(2, "0"),
    sub:    (stats) => `${stats.totalHours}h total`,
  },
  {
    key:    "totalHours",
    name:   "Total Hours",
    icon:   Clock,
    badge:  "Active",
    accent: "from-violet-500 to-purple-600",
    format: (v) => `${v}h`,
    sub:    (stats) => `${stats.totalHoursTaught}h Taught • ${stats.totalHoursLearned}h Learned`,
  },
  {
    key:    "activeMatchesCount",
    name:   "Active Matches",
    icon:   Users,
    badge:  "Live",
    accent: "from-emerald-500 to-teal-600",
    format: (v) => String(v).padStart(2, "0"),
    sub:    () => "matched partners",
  },
  {
    key:    "averageRating",
    name:   "Rating Score",
    icon:   Star,
    badge:  "Reviews",
    accent: "from-amber-400 to-orange-500",
    format: (v) => (v === 0 ? "—" : v.toFixed(1)),
    sub:    (stats) =>
      stats.reviewCount === 0
        ? "No reviews yet"
        : `${stats.reviewCount} review${stats.reviewCount !== 1 ? "s" : ""}`,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardHome() {
  const navigate = useNavigate();

  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [data, setData]         = useState({
    stats:           null,
    activeExchanges: [],
    activityStream:  [],
  });

  const fetchOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const res   = await fetch("/api/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load dashboard data");
      }

      setData({
        stats:           json.stats,
        activeExchanges: json.activeExchanges || [],
        activityStream:  json.activityStream  || [],
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();

    // Re-fetch when a new swap is created (event dispatched by NewSwap.jsx)
    const handleSwapCreated = () => fetchOverview();
    window.addEventListener("swapCreated", handleSwapCreated);
    return () => window.removeEventListener("swapCreated", handleSwapCreated);
  }, [fetchOverview]);

  const { stats, activeExchanges, activityStream } = data;

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">

      {/* ── Error Banner ── */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>
            <strong>Couldn't load dashboard data:</strong> {error} —{" "}
            <button
              onClick={fetchOverview}
              className="underline font-semibold hover:text-rose-800 cursor-pointer"
            >
              Retry
            </button>
          </span>
        </div>
      )}

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl shadow-slate-900/10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            {/* Credits badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-300 text-xs font-semibold">
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              {loading ? (
                <span className="w-20 h-3 bg-blue-400/30 rounded animate-pulse inline-block" />
              ) : (
                <span>{stats?.totalCredits ?? 100} Credits Available</span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready for your next{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Skill Swap?
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {loading
                ? "Loading your session data…"
                : activeExchanges.length > 0
                ? `You have ${activeExchanges.length} active exchange${activeExchanges.length !== 1 ? "s" : ""}. Keep swapping to level up your mentor badge.`
                : "Post your first swap offer and start exchanging skills with the community."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <Link to="/dashboard/new-swap">
              <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-600/30 cursor-pointer">
                <Plus size={16} />
                <span>Create Swap Offer</span>
              </button>
            </Link>
            <Link to="/dashboard/explore">
              <button className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs sm:text-sm font-semibold backdrop-blur-md transition-all cursor-pointer">
                <Search size={16} />
                <span>Find Mentors</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? [1, 2, 3, 4].map((i) => <StatSkeleton key={i} />)
          : STAT_CONFIG.map((cfg) => {
              const Icon    = cfg.icon;
              const value   = stats?.[cfg.key] ?? 0;
              const display = cfg.format(value);
              const subtext = cfg.sub(stats ?? {});

              return (
                <div
                  key={cfg.key}
                  className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${cfg.accent} text-white shadow-md shadow-blue-500/10`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {cfg.badge}
                    </span>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">
                      {display}
                    </div>
                    <div className="text-xs font-bold text-slate-700 mt-1">{cfg.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                      <TrendingUp size={12} className="text-emerald-500" />
                      <span>{subtext}</span>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* ── Active Exchanges + Activity Stream ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Active Skill Exchanges */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <span>Active Skill Exchanges</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Your confirmed and upcoming 1-on-1 sessions
              </p>
            </div>
            <Link
              to="/dashboard/sessions"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              <span>View Schedule</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <>
                <ExchangeCardSkeleton />
                <ExchangeCardSkeleton />
              </>
            ) : activeExchanges.length === 0 ? (
              <EmptyExchanges />
            ) : (
              activeExchanges.map((swap) => (
                <div
                  key={String(swap.id)}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-all space-y-4"
                >
                  {/* Partner info + status badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {swap.partner?.avatarUrl ? (
                        <img
                          src={swap.partner.avatarUrl}
                          alt={swap.partner.name}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center ring-2 ring-slate-100">
                          {swap.partner
                            ? swap.partner.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "?"}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          {swap.partner?.name ?? "Open Offer"}
                          {swap.partner && (
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {swap.partner.role}
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Next session:{" "}
                          <span className="font-bold text-slate-800">
                            {swap.nextSession}
                          </span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`self-start sm:self-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        swap.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                          : "bg-amber-50 text-amber-600 border border-amber-200/60"
                      }`}
                    >
                      {swap.status}
                    </span>
                  </div>

                  {/* Teaching / Learning row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-slate-500">Teaching:</span>
                      <span className="font-bold text-slate-800 truncate">{swap.teaching}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                      <span className="text-slate-500">Learning:</span>
                      <span className="font-bold text-slate-800 truncate">{swap.learning}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {swap.partner ? (
                      <Link
                        to={`/dashboard/messages?userId=${swap.partner.id}`}
                        className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare size={14} />
                        <span>Chat Partner</span>
                      </Link>
                    ) : (
                      <span className="px-3.5 py-2 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>Awaiting Match</span>
                      </span>
                    )}
                    <Link
                      to="/dashboard/room"
                      className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      Enter Room
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Activity Stream + Sprint Card */}
        <div className="space-y-6">

          {/* Activity Stream */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles size={16} className="text-blue-600" />
              <span>Activity Stream</span>
            </h3>

            {loading ? (
              <ActivitySkeleton />
            ) : activityStream.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                No recent activity yet. Create your first swap offer!
              </p>
            ) : (
              <div className="space-y-4">
                {activityStream.map((act) => (
                  <div key={String(act.id)} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {act.initials || act.user?.slice(0, 2).toUpperCase() || "??"}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{act.user}</h5>
                        <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{act.action}</p>
                      <p className="text-[10px] font-semibold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded-md">
                        {act.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Monthly Sprint Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-5 rounded-2xl text-white space-y-3 shadow-md shadow-indigo-500/20">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-300" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-100">
                Monthly Sprint
              </h4>
            </div>
            <h3 className="text-base font-extrabold">Teach 5 hours this week</h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Complete more teaching sessions to unlock the{" "}
              <span className="font-bold text-white">Master Mentor</span> badge.
            </p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-700"
                style={{
                  width: stats
                    ? `${Math.min(100, (stats.totalHoursTaught / 5) * 100)}%`
                    : "0%",
                }}
              />
            </div>
            {stats && (
              <p className="text-[11px] text-indigo-200">
                {stats.totalHoursTaught}h of 5h taught this month
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}