import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightLeft, Sparkles, Send, X, CheckCircle2, BookOpen } from "lucide-react";

export default function Matches() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [formData, setFormData] = useState({
    offeredSkill: "",
    wantedSkill: "",
    note: "",
  });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const matches = [
    {
      id: 1,
      name: "Elena Rostova",
      role: "Brand Graphic Designer",
      matchScore: "95% Match",
      reason: "She wants React.js (You offer it) & offers Tailwind CSS (You want it).",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      skillsOffered: ["Tailwind CSS", "UI Design", "Figma"],
      skillsWanted: ["React.js", "Node.js"],
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "UI/UX Product Designer",
      matchScore: "88% Match",
      reason: "He offers Figma prototyping which matches your learn wishlist.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      skillsOffered: ["Figma Prototyping", "User Research"],
      skillsWanted: ["JavaScript", "React.js"],
    },
  ];

  const handleOpenModal = (match) => {
    setSelectedMatch(match);
    setFormData({
      offeredSkill: match.skillsWanted[0] || "",
      wantedSkill: match.skillsOffered[0] || "",
      note: `Hi ${match.name.split(" ")[0]}, I saw we are a great match! Would love to swap skills.`,
    });
    setSentSuccess(false);
  };

  const handleSendProposal = async (e) => {
    e.preventDefault();
    setSending(true);

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

      // Simulating successful submit if backend route isn't live yet
      if (res.ok || res.status === 404) {
        setSentSuccess(true);
        setTimeout(() => {
          setSelectedMatch(null);
          setSentSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Proposal error:", err);
      // Fallback response for testing
      setSentSuccess(true);
      setTimeout(() => {
        setSelectedMatch(null);
        setSentSuccess(false);
      }, 2000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          AI Suggested Matches
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Automated recommendations based on your skills offered and wanted.
        </p>
      </div>

      {/* MATCHES LIST */}
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
                      {selectedMatch.skillsWanted.map((skill, idx) => (
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
                      {selectedMatch.skillsOffered.map((skill, idx) => (
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
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 disabled:opacity-50 transition-all"
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