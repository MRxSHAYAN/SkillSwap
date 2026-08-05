import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  Clock,
  ArrowRightLeft,
  SlidersHorizontal,
  GraduationCap,
  MessageSquare,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Development",
  "Design",
  "Marketing",
  "Languages",
  "Business",
  "Other",
];

export default function DashboardExploreSkills() {
  const navigate = useNavigate();

  const [skills, setSkills]               = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [searchTerm, setSearchTerm]       = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Proposal Modal state
  const [proposalTarget, setProposalTarget] = useState(null); // listing object
  const [submitting, setSubmitting]       = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState("");
  const [proposalError, setProposalError]   = useState("");
  const [proposalForm, setProposalForm]   = useState({
    offeredSkill: "",
    wantedSkill: "",
    category: "Development",
    preferredDuration: "1 Hour",
    availability: "Flexible",
    description: "",
  });

  // Fetch all available skills from backend
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await fetch("/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to fetch skill listings");
      }
      setSkills(json.data || []);
    } catch (err) {
      console.error("fetchSkills error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Open Propose Swap modal
  const handleOpenProposal = (mentor) => {
    setProposalTarget(mentor);
    setProposalError("");
    setProposalSuccess("");
    setProposalForm({
      offeredSkill: "",
      wantedSkill: mentor.offering?.[0] || mentor.offeredSkill || "",
      category: mentor.category || "Development",
      preferredDuration: mentor.preferredDuration || "1 Hour",
      availability: mentor.availability || "Flexible",
      description: `Hi ${mentor.name}, I would love to swap skills with you!`,
    });
  };

  // Submit proposal to POST /api/swaps/create with partner ID
  const handleSendProposal = async (e) => {
    e.preventDefault();
    if (!proposalTarget) return;

    if (!proposalForm.offeredSkill.trim()) {
      setProposalError("Please enter the skill you want to teach.");
      return;
    }

    try {
      setSubmitting(true);
      setProposalError("");
      setProposalSuccess("");

      const token = localStorage.getItem("token");
      const res = await fetch("/api/swaps/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          partner: proposalTarget.mentorId,
          offeredSkill: proposalForm.offeredSkill.trim(),
          wantedSkill: proposalForm.wantedSkill.trim(),
          category: proposalForm.category,
          preferredDuration: proposalForm.preferredDuration,
          availability: proposalForm.availability,
          description: proposalForm.description.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to send proposal");
      }

      setProposalSuccess(`Swap proposal sent to ${proposalTarget.name}!`);
      setTimeout(() => {
        setProposalTarget(null);
        setProposalSuccess("");
      }, 2000);
    } catch (err) {
      console.error("handleSendProposal error:", err);
      setProposalError(err.message || "Failed to send proposal. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter skills by category & search term
  const filteredSkills = skills.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const nameMatch = item.name?.toLowerCase().includes(term);
    const offeringMatch = item.offering?.some((s) => s.toLowerCase().includes(term));
    const seekingMatch  = item.seeking?.some((s) => s.toLowerCase().includes(term));
    const descMatch     = item.description?.toLowerCase().includes(term);

    return matchesCategory && (nameMatch || offeringMatch || seekingMatch || descMatch);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* ── Header & Search Filter Bar ── */}
      <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium mb-2 border border-blue-100">
              <Sparkles size={12} />
              <span>Community Marketplace</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Explore Skills &amp; Mentors
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Connect with peers to swap knowledge and build new abilities together.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by skill, topic, or mentor name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-blue-600 font-semibold border border-blue-200 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Error Banner ── */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Grid of Skill Cards ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs animate-pulse space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-3 w-24 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-16 bg-slate-100 rounded-xl" />
              <div className="h-9 bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 space-y-2">
          <GraduationCap size={32} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">No available skills found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or selecting another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSkills.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              {/* Mentor Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-slate-200">
                      {item.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "??"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {item.rating || 5.0}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({item.reviewsCount || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200/60 shrink-0">
                  {item.category}
                </span>
              </div>

              {/* Offered / Seeking skills */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Teaches:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.offering?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Wants to Learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {item.seeking?.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleOpenProposal(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                >
                  <ArrowRightLeft size={14} />
                  <span>Propose Swap</span>
                </button>
                {item.mentorId && (
                  <Link
                    to={`/dashboard/messages?userId=${item.mentorId}`}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  >
                    <MessageSquare size={16} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Proposal Modal ── */}
      {proposalTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setProposalTarget(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-semibold mb-2">
                <UserCheck size={13} />
                <span>Send Proposal</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Propose Swap to {proposalTarget.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Offer one of your skills in exchange for{" "}
                <span className="font-bold text-slate-700">
                  {proposalForm.wantedSkill}
                </span>.
              </p>
            </div>

            {/* Status alerts */}
            {proposalSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{proposalSuccess}</span>
              </div>
            )}
            {proposalError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-500 shrink-0" />
                <span>{proposalError}</span>
              </div>
            )}

            {/* Proposal Form */}
            <form onSubmit={handleSendProposal} className="space-y-4">
              {/* Skill You Offer */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Skill You Want to Teach <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React.js, Python, Spanish"
                  value={proposalForm.offeredSkill}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, offeredSkill: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Skill You Want */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Skill You Want to Learn
                </label>
                <input
                  type="text"
                  readOnly
                  value={proposalForm.wantedSkill}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 font-semibold cursor-not-allowed"
                />
              </div>

              {/* Session Duration & Availability */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Duration
                  </label>
                  <select
                    value={proposalForm.preferredDuration}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, preferredDuration: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="30 Mins">30 Minutes</option>
                    <option value="1 Hour">1 Hour</option>
                    <option value="2 Hours">2 Hours</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Availability
                  </label>
                  <select
                    value={proposalForm.availability}
                    onChange={(e) =>
                      setProposalForm({ ...proposalForm, availability: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Message / Proposal Note
                </label>
                <textarea
                  rows={3}
                  value={proposalForm.description}
                  onChange={(e) =>
                    setProposalForm({ ...proposalForm, description: e.target.value })
                  }
                  placeholder="Introduce yourself and describe how you can help each other..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProposalTarget(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold transition-colors shadow-2xs"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRightLeft size={14} />
                      <span>Send Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}