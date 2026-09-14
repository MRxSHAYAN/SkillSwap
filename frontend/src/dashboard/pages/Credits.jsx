import React, { useState, useEffect, useMemo } from "react";
import {
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  AlertCircle,
  History,
  TrendingUp,
  TrendingDown,
  Wallet,
  Star,
  Shield,
  Flame,
  Award,
  BookOpen,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { apiFetch } from "../../utils/apiFetch";

// ── Tier config ───────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Newcomer",
    min: 0,
    icon: BookOpen,
    color: "text-slate-500",
    bg: "bg-slate-100",
    border: "border-slate-200",
    bar: "bg-slate-400",
    pill: "bg-slate-100 text-slate-600 border-slate-200",
  },
  {
    name: "Explorer",
    min: 50,
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    bar: "bg-blue-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Contributor",
    min: 100,
    icon: Flame,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    bar: "bg-purple-500",
    pill: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    name: "Mentor",
    min: 200,
    icon: Award,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "bg-amber-500",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    name: "Master",
    min: 400,
    icon: Star,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export function getTier(totalEarned) {
  let current = TIERS[0];
  for (const tier of TIERS) {
    if (totalEarned >= tier.min) current = tier;
  }
  return current;
}

export function getNextTier(totalEarned) {
  for (const tier of TIERS) {
    if (totalEarned < tier.min) return tier;
  }
  return null; // already at max
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-slate-100 rounded-xl ${className}`} />;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Credits() {
  const [credits, setCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | earned | spent

  const fetchCredits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiFetch("/api/credits");
      setCredits(data.credits ?? 0);
      setTransactions(data.transactions || []);
    } catch (err) {
      setError(err.message || "Unable to load credit details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  // ── Computed values ─────────────────────────────────────────────────────────
  const totalEarned = useMemo(
    () => transactions.filter((t) => t.type === "EARNED").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalSpent = useMemo(
    () => transactions.filter((t) => t.type === "SPENT").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  const currentTier = getTier(totalEarned);
  const nextTier = getNextTier(totalEarned);
  const TierIcon = currentTier.icon;

  const progressPct = nextTier
    ? Math.round(((totalEarned - currentTier.min) / (nextTier.min - currentTier.min)) * 100)
    : 100;

  const filtered = useMemo(() => {
    if (filter === "earned") return transactions.filter((t) => t.type === "EARNED");
    if (filter === "spent") return transactions.filter((t) => t.type === "SPENT");
    return transactions;
  }, [transactions, filter]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-14">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Credits & Rewards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Earn credits by teaching. Spend them to learn from others.
          </p>
        </div>
        <button
          onClick={fetchCredits}
          disabled={loading}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors disabled:opacity-50 cursor-pointer"
          title="Refresh"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
          <button
            onClick={fetchCredits}
            className="ml-auto font-semibold underline hover:text-rose-800 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-5 rounded-2xl text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-8 w-16 h-16 bg-white/5 rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-100 text-xs font-semibold mb-3">
              <Wallet size={14} />
              <span>Current Balance</span>
            </div>
            {loading ? (
              <div className="h-9 w-28 bg-white/20 rounded-lg animate-pulse" />
            ) : (
              <p className="text-4xl font-black tracking-tight">{credits}</p>
            )}
            <p className="text-xs text-blue-200 mt-1">credits available</p>
          </div>
        </div>

        {/* Total Earned */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Earned</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <TrendingUp size={14} className="text-emerald-600" />
            </div>
          </div>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <p className="text-3xl font-black text-slate-900">{totalEarned}</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">all-time from teaching</p>
        </div>

        {/* Total Spent */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Spent</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
              <TrendingDown size={14} className="text-rose-500" />
            </div>
          </div>
          {loading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <p className="text-3xl font-black text-slate-900">{totalSpent}</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">all-time on learning</p>
        </div>
      </div>

      {/* ── Tier Progress ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Top: current tier */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl ${currentTier.bg} ${currentTier.border} border flex items-center justify-center shrink-0`}>
              {loading ? (
                <div className="w-6 h-6 rounded-lg bg-slate-200 animate-pulse" />
              ) : (
                <TierIcon size={24} className={currentTier.color} />
              )}
            </div>
            <div>
              {loading ? (
                <>
                  <Skeleton className="h-5 w-24 mb-1.5" />
                  <Skeleton className="h-3 w-36" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {currentTier.name}
                    </h3>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${currentTier.pill}`}>
                      Current Tier
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {totalEarned} credits earned in total
                  </p>
                </>
              )}
            </div>
          </div>

          {!loading && nextTier && (
            <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
              <ChevronRight size={14} />
              <span>Next:</span>
              <span className="font-bold text-slate-700">{nextTier.name}</span>
              <span className="text-slate-400">at {nextTier.min} credits</span>
            </div>
          )}
          {!loading && !nextTier && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Star size={13} className="fill-emerald-500 text-emerald-500" />
              Max Tier Reached
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!loading && nextTier && (
          <div className="px-5 sm:px-6 py-4 bg-slate-50/60">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
              <span>{currentTier.name} — {currentTier.min} credits</span>
              <span>{nextTier.name} — {nextTier.min} credits</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-700 ${currentTier.bar}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {nextTier.min - totalEarned} more credits to reach {nextTier.name}
            </p>
          </div>
        )}

        {/* Tier track */}
        <div className="px-5 sm:px-6 py-4 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {TIERS.map((tier, i) => {
            const Icon = tier.icon;
            const reached = totalEarned >= tier.min;
            const isCurrent = tier.name === currentTier.name;
            return (
              <React.Fragment key={tier.name}>
                <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-all`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all
                    ${isCurrent ? `${tier.bg} ${tier.border} ring-2 ring-offset-1 ${tier.border}` :
                      reached ? `${tier.bg} ${tier.border}` : "bg-slate-50 border-slate-200"}`}
                  >
                    <Icon size={16} className={reached ? tier.color : "text-slate-300"} />
                  </div>
                  <span className={`text-[10px] font-semibold whitespace-nowrap ${isCurrent ? tier.color : reached ? "text-slate-500" : "text-slate-300"}`}>
                    {tier.name}
                  </span>
                </div>
                {i < TIERS.length - 1 && (
                  <div className={`flex-1 h-0.5 rounded-full min-w-[16px] ${totalEarned >= TIERS[i + 1].min ? currentTier.bar : "bg-slate-200"}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── How Credits Work ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6">
        <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Shield size={16} className="text-blue-600" />
          How Credits Work
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Start with 50 Credits",
              desc: "Every new member gets 50 credits on signup — enough to book your first learning session.",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              step: "02",
              title: "Teach & Earn 50",
              desc: "Complete a swap session as the teacher and earn 50 credits added straight to your balance.",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              step: "03",
              title: "Spend to Learn",
              desc: "Book a session with any skilled member for 50 credits. No cash, no subscriptions, ever.",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center shrink-0 text-xs font-black ${item.color}`}>
                {item.step}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{item.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transaction History ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Header + filter tabs */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <History size={15} className="text-slate-400" />
            Transaction History
          </h3>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: "all", label: "All" },
              { id: "earned", label: "Earned" },
              { id: "spent", label: "Spent" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-40 bg-slate-100 rounded" />
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <p className="text-xs font-semibold text-slate-600">No transactions yet</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                Complete your first skill swap session to earn credits.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((tx) => {
                const isEarned = tx.type === "EARNED";
                const date = tx.createdAt
                  ? new Date(tx.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                return (
                  <div
                    key={tx._id || Math.random()}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/60 border border-slate-100 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isEarned ? "bg-emerald-50 border border-emerald-100" : "bg-rose-50 border border-rose-100"
                    }`}>
                      {isEarned
                        ? <ArrowDownLeft size={15} className="text-emerald-600" />
                        : <ArrowUpRight size={15} className="text-rose-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {tx.description}
                        {tx.partnerName && (
                          <span className="font-normal text-slate-500"> · {tx.partnerName}</span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{date}</p>
                    </div>
                    <span className={`text-sm font-black shrink-0 ${
                      isEarned ? "text-emerald-600" : "text-rose-500"
                    }`}>
                      {isEarned ? "+" : "-"}{tx.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
