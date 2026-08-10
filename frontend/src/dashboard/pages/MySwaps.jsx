import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/apiFetch";
import {
  Inbox,
  Send,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Plus,
  Loader2,
  AlertCircle,
  Check,
  X,
  MessageSquare,
  Video,
  Trophy,
  Star,
  CalendarCheck,
  Zap,
  GraduationCap,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ user, size = "md" }) {
  const sizeMap = {
    sm: "w-9 h-9 text-[11px]",
    md: "w-11 h-11 text-xs",
    lg: "w-14 h-14 text-sm",
  };
  const cls = sizeMap[size] || sizeMap.md;
  if (user?.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.fullName}
        className={`${cls} rounded-full object-cover border border-slate-200 shrink-0`}
      />
    );
  }
  return (
    <div
      className={`${cls} rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center border border-slate-200 shrink-0`}
    >
      {getInitials(user?.fullName)}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:   "bg-amber-50 text-amber-700 border-amber-200",
    open:      "bg-slate-100 text-slate-600 border-slate-200",
    accepted:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    matched:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected:  "bg-rose-50 text-rose-600 border-rose-200",
    completed: "bg-blue-50 text-blue-700 border-blue-200",
    cancelled: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const label = {
    accepted: "CONFIRMED",
    matched:  "CONFIRMED",
  }[status] || status?.toUpperCase();

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
        map[status] || "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {label}
    </span>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({ active, onClick, icon: Icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
        active
          ? "bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
      {badge > 0 && (
        <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-slate-200 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-36 bg-slate-200 rounded" />
          <div className="h-3 w-24 bg-slate-100 rounded" />
        </div>
        <div className="h-5 w-20 bg-slate-100 rounded-full" />
      </div>
      <div className="h-12 bg-slate-100 rounded-xl" />
      <div className="h-9 bg-slate-200 rounded-xl" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MySwaps() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab]   = useState("active"); // 'active' | 'received' | 'sent'
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [activeSwaps, setActiveSwaps]           = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests]         = useState([]);
  const [actionLoadingId, setActionLoadingId]   = useState(null);
  const [toastMsg, setToastMsg]     = useState({ text: "", type: "success" });

  const showToast = (text, type = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg({ text: "", type: "success" }), 5000);
  };

  // ── Fetch all data ──────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const json = await apiFetch("/api/swaps/my-requests");
      setActiveSwaps(json.activeSwaps || []);
      setReceivedRequests(json.receivedRequests || []);
      setSentRequests(json.sentRequests || []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Unable to fetch your swap requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Accept / Decline ────────────────────────────────────────────────────────
  const handleStatusUpdate = async (swapId, newStatus) => {
    try {
      setActionLoadingId(swapId);

      // Optimistic update on received list
      setReceivedRequests((prev) =>
        prev.map((r) => (r._id === swapId ? { ...r, status: newStatus } : r))
      );

      const json = await apiFetch(`/api/swaps/${swapId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      if (newStatus === "accepted") {
        showToast("Proposal accepted! The swap is now ACTIVE.", "success");
        setActiveTab("active"); // instantly jump to active tab
      } else {
        showToast("Proposal declined.", "info");
      }

      // Full refresh to move cards between tabs
      fetchAll();
    } catch (err) {
      console.error("API Error:", err);
      setError(`Unable to ${newStatus} swap proposal. Please try again later.`);
      fetchAll();
    } finally {
      setActionLoadingId(null);
    }
  };

  // ── Complete Swap ───────────────────────────────────────────────────────────
  const handleComplete = async (swapId) => {
    if (
      !window.confirm(
        "Mark this swap as completed? Both partners will be notified and can submit reviews."
      )
    )
      return;

    try {
      setActionLoadingId(swapId);
      const json = await apiFetch(`/api/swaps/${swapId}/complete`, {
        method: "PATCH",
      });
      showToast("Swap completed! Credits earned. You can now submit a review.", "success");
      fetchAll();
    } catch (err) {
      console.error("API Error:", err);
      setError("Unable to complete swap session. Please try again later.");
    } finally {
      setActionLoadingId(null);
    }
  };

  // ── Derived counts ──────────────────────────────────────────────────────────
  const pendingReceivedCount = receivedRequests.filter(
    (r) => r.status === "pending" || r.status === "open"
  ).length;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Swaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your active skill exchanges, incoming proposals, and outbound requests.
          </p>
        </div>
        <Link
          to="/dashboard/new-swap"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer self-start"
        >
          <Plus size={15} />
          <span>New Offer</span>
        </Link>
      </div>

      {/* ── Toast ── */}
      {toastMsg.text && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-3 ${
            toastMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          <CheckCircle2 size={18} className="shrink-0" />
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── 3-Tab Navigation ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-1">
        <TabButton
          active={activeTab === "active"}
          onClick={() => setActiveTab("active")}
          icon={ArrowRightLeft}
          label={`Active Swaps${activeSwaps.length > 0 ? ` (${activeSwaps.length})` : ""}`}
          badge={0}
        />
        <TabButton
          active={activeTab === "received"}
          onClick={() => setActiveTab("received")}
          icon={Inbox}
          label="Received"
          badge={pendingReceivedCount}
        />
        <TabButton
          active={activeTab === "sent"}
          onClick={() => setActiveTab("sent")}
          icon={Send}
          label={`Sent (${sentRequests.length})`}
          badge={0}
        />
      </div>

      {/* ── Tab Content ── */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => <SkeletonCard key={n} />)}
        </div>

      ) : activeTab === "active" ? (
        /* ══════════ ACTIVE SWAPS TAB ══════════ */
        activeSwaps.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto">
              <ArrowRightLeft size={26} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No active swaps yet</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Once a proposal is accepted, it will appear here as an active skill
              exchange with session controls.
            </p>
            <Link
              to="/dashboard/explore"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <GraduationCap size={14} />
              Explore Skills
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {activeSwaps.map((swap) => {
              const userId = JSON.parse(localStorage.getItem("user") || "{}").id ||
                             JSON.parse(localStorage.getItem("user") || "{}")._id;
              const isCreator = swap.creator?._id?.toString() === userId?.toString();
              const partner   = isCreator ? swap.partner : swap.creator;
              const teaching  = isCreator ? swap.offeredSkill : swap.wantedSkill;
              const learning  = isCreator ? swap.wantedSkill  : swap.offeredSkill;

              const nextSessionDisplay = swap.nextSession
                ? new Date(swap.nextSession).toLocaleString("en-US", {
                    weekday: "short",
                    month:   "short",
                    day:     "numeric",
                    hour:    "numeric",
                    minute:  "2-digit",
                  })
                : "Not scheduled yet";

              return (
                <div
                  key={swap._id}
                  className="bg-white rounded-3xl border border-emerald-200/80 shadow-2xs overflow-hidden"
                >
                  {/* Green accent top bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-blue-500" />

                  <div className="p-5 sm:p-6 space-y-5">
                    {/* Header: Partner + Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar user={partner} size="lg" />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-slate-900">
                              {partner?.fullName || "Community Member"}
                            </h3>
                            <StatusBadge status="accepted" />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {partner?.skillsTeach?.[0]
                              ? `${partner.skillsTeach[0]} Mentor`
                              : "Skill Swap Partner"}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-[11px] font-semibold text-amber-600">
                              5.0
                            </span>
                            <span className="text-[10px] text-slate-400">(New)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <CalendarCheck size={13} className="text-slate-400" />
                        <span className="text-[11px] text-slate-500 font-semibold">
                          {nextSessionDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Skills Exchange Badge Row */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200/80">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Teaching:
                        </span>
                        <span className="text-xs font-bold text-emerald-800">
                          {teaching}
                        </span>
                      </div>

                      <ArrowRightLeft size={14} className="text-slate-400 shrink-0" />

                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200/80">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Learning:
                        </span>
                        <span className="text-xs font-bold text-blue-800">
                          {learning}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-400 ml-auto">
                        {swap.preferredDuration || "1 Hour"} • {swap.availability || "Flexible"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                      {/* Chat Partner */}
                      {partner?._id && (
                        <Link
                          to={`/dashboard/messages?userId=${partner._id}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <MessageSquare size={14} />
                          <span>Chat Partner</span>
                        </Link>
                      )}

                      {/* Join Session / Enter Room */}
                      <Link
                        to="/dashboard/room"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <Video size={14} />
                        <span>Enter Session Room</span>
                      </Link>

                      {/* Complete Swap */}
                      <button
                        onClick={() => handleComplete(swap._id)}
                        disabled={actionLoadingId === swap._id}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 ml-auto"
                      >
                        {actionLoadingId === swap._id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trophy size={13} />
                        )}
                        <span>Complete Swap</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )

      ) : activeTab === "received" ? (
        /* ══════════ RECEIVED REQUESTS TAB ══════════ */
        receivedRequests.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 space-y-3">
            <Inbox size={32} className="mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-800">No received proposals</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              When community members propose a skill swap with you, their requests appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {receivedRequests.map((req) => {
              const sender     = req.creator;
              const isPending  = req.status === "pending" || req.status === "open";
              const isAccepted = req.status === "accepted" || req.status === "matched";
              const isRejected = req.status === "rejected";

              return (
                <div
                  key={req._id}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar user={sender} />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {sender?.fullName || "A Community Member"}
                          {sender?.country && (
                            <span className="text-[10px] font-normal text-slate-400 ml-1">
                              ({sender.country})
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Offer:{" "}
                          <span className="font-semibold text-slate-800">
                            {req.offeredSkill}
                          </span>{" "}
                          ↔{" "}
                          <span className="font-semibold text-slate-800">
                            {req.wantedSkill}
                          </span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>

                  {/* Skills bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-500">They Teach:</span>
                      <span className="font-bold text-slate-800">{req.offeredSkill}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-slate-500">You Teach:</span>
                      <span className="font-bold text-slate-800">{req.wantedSkill}</span>
                    </div>
                  </div>

                  {req.description && (
                    <p className="text-xs text-slate-600 italic bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      "{req.description}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400">
                      {req.preferredDuration || "1 Hour"} • {req.availability || "Flexible"}
                    </span>

                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStatusUpdate(req._id, "rejected")}
                          disabled={actionLoadingId === req._id}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <X size={13} />
                          Decline
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "accepted")}
                          disabled={actionLoadingId === req._id}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
                        >
                          {actionLoadingId === req._id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Check size={13} />
                          )}
                          Accept Proposal
                        </button>
                      </div>
                    ) : isAccepted ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Accepted
                        </span>
                        {sender?._id && (
                          <Link
                            to={`/dashboard/messages?userId=${sender._id}`}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-xl flex items-center gap-1"
                          >
                            <MessageSquare size={12} /> Chat
                          </Link>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <XCircle size={13} /> Declined
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )

      ) : (
        /* ══════════ SENT REQUESTS TAB ══════════ */
        sentRequests.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 space-y-3">
            <Send size={32} className="mx-auto text-slate-300" />
            <h3 className="text-sm font-bold text-slate-800">No sent proposals</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Proposals you send to mentors on the Explore page will appear here.
            </p>
            <Link
              to="/dashboard/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
            >
              Explore Skills
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sentRequests.map((req) => {
              const recipient  = req.partner;
              const isAccepted = req.status === "accepted" || req.status === "matched";
              const isRejected = req.status === "rejected";

              return (
                <div
                  key={req._id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar user={recipient} size="sm" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {recipient
                            ? `To: ${recipient.fullName}`
                            : "Open Offer (Community Feed)"}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {req.offeredSkill} ↔ {req.wantedSkill}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {req.preferredDuration || "1 Hour"} • {req.availability || "Flexible"}
                    </span>
                    {isAccepted && recipient?._id && (
                      <Link
                        to={`/dashboard/messages?userId=${recipient._id}`}
                        className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <MessageSquare size={12} />
                        Chat Partner
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
