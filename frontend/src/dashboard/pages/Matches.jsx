import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightLeft,
  Sparkles,
  Send,
  X,
  CheckCircle2,
  BookOpen,
  AlertCircle,
  Users,
  RefreshCw,
} from "lucide-react";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [formData, setFormData] = useState({
    offeredSkill: "",
    wantedSkill: "",
    note: "",
  });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/matches/ai-suggestions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMatches(data.data || []);
      } else {
        setError(data.message || "Failed to fetch AI match suggestions.");
      }
    } catch (err) {
      console.error("Fetch matches error:", err);
      setError("Network error: Unable to connect to match service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleOpenModal = (match) => {
    setSelectedMatch(match);
    setModalError(null);

    const targetWanted =
      Array.isArray(match.skillsWanted) && match.skillsWanted.length > 0
        ? match.skillsWanted
        : ["General Skills"];
    const targetOffered =
      Array.isArray(match.skillsOffered) && match.skillsOffered.length > 0
        ? match.skillsOffered
        : ["General Skills"];

    const firstName = match.name ? match.name.split(" ")[0] : "there";

    setFormData({
      offeredSkill: targetWanted[0] || "",
      wantedSkill: targetOffered[0] || "",
      note: `Hi ${firstName}, I saw we are a great match! Would love to swap skills.`,
    });
    setSentSuccess(false);
  };

  const handleSendProposal = async (e) => {
    e.preventDefault();
    setSending(true);
    setModalError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/swaps/propose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: selectedMatch.id,
          offeredSkill: formData.offeredSkill,
          wantedSkill: formData.wantedSkill,
          note: formData.note,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSentSuccess(true);
        setTimeout(() => {
          setSelectedMatch(null);
          setSentSuccess(false);
        }, 2200);
      } else {
        setModalError(data.message || "Failed to send proposal. Please try again.");
      }
    } catch (err) {
      console.error("Proposal error:", err);
      setModalError("Network error while submitting proposal.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Suggested Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Automated recommendations based on your skills offered and wanted.
          </p>
        </div>

        <button
          onClick={fetchMatches}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Matches</span>
        </button>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchMatches}
            className="underline font-bold hover:text-rose-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* SKELETON LOADING STATE */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-36 bg-slate-200 rounded" />
                    <div className="h-4 w-20 bg-emerald-100/60 rounded-full" />
                  </div>
                  <div className="h-3 w-28 bg-slate-200 rounded" />
                  <div className="h-3 w-64 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-9 w-36 bg-slate-200 rounded-xl self-start sm:self-auto" />
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && matches.length === 0 && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-2xs">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Users size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Matches Found Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find other users matching your skills right now. Make sure you've filled out your offered and wanted skills in Settings!
          </p>
          <Link
            to="/dashboard/settings"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10"
          >
            Update Your Skills
          </Link>
        </div>
      )}

      {/* MATCHES LIST */}
      {!loading && !error && matches.length > 0 && (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={match.avatar}
                  alt={match.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{match.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles size={10} /> {match.matchScore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{match.role}</p>
                  <p className="text-xs text-slate-600 mt-1 italic">{match.reason}</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(match)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer transition-all shadow-md shadow-blue-500/10 active:scale-[0.98]"
              >
                <ArrowRightLeft size={14} />
                <span>Send Swap Proposal</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PROPOSAL MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMatch(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            {sentSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-slate-900">Proposal Sent!</h3>
                <p className="text-xs text-slate-500">
                  Your skill swap proposal was sent to {selectedMatch.name}. You’ll be notified when they accept.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendProposal} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold mb-2">
                    <BookOpen size={12} /> SKILL SWAP PROPOSAL
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Propose Swap with {selectedMatch.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Define what you want to teach and what you want to learn.
                  </p>
                </div>

                {modalError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0 text-rose-600" />
                    <span>{modalError}</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* You Offer */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Skill You Will Offer:
                    </label>
                    <select
                      value={formData.offeredSkill}
                      onChange={(e) => setFormData({ ...formData, offeredSkill: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      {(selectedMatch.skillsWanted || []).map((skill, idx) => (
                        <option key={idx} value={skill}>
                          {skill} (They Want)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* You Want */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Skill You Want in Return:
                    </label>
                    <select
                      value={formData.wantedSkill}
                      onChange={(e) => setFormData({ ...formData, wantedSkill: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      {(selectedMatch.skillsOffered || []).map((skill, idx) => (
                        <option key={idx} value={skill}>
                          {skill} (They Offer)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Personal Message:
                    </label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-medium resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMatch(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <span>{sending ? "Sending..." : "Send Proposal"}</span>
                      <Send size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }