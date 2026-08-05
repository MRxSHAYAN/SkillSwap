import React, { useState } from "react";
import {
  Plus,
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const CATEGORIES = [
  "Development",
  "Design",
  "Business",
  "Languages",
  "Marketing",
  "Other",
];

const INITIAL_FORM = {
  offeredSkill:      "",
  wantedSkill:       "",
  category:          "Development",
  skillLevel:        "Intermediate",
  preferredDuration: "1 Hour",
  availability:      "Flexible",
  description:       "",
};

export default function NewSwap() {
  const [formData, setFormData]     = useState(INITIAL_FORM);
  const [isLoading, setIsLoading]   = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg]     = useState("");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear status messages when user edits the form
    if (successMsg) setSuccessMsg("");
    if (errorMsg)   setErrorMsg("");
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/swaps/create", {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify({
          offeredSkill:      formData.offeredSkill.trim(),
          wantedSkill:       formData.wantedSkill.trim(),
          category:          formData.category,
          description:       formData.description.trim(),
          skillLevel:        formData.skillLevel,
          preferredDuration: formData.preferredDuration,
          availability:      formData.availability,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create swap offer");
      }

      // Success — reset form and notify Dashboard to refresh
      setSuccessMsg("Your swap offer has been posted to the community feed!");
      setFormData(INITIAL_FORM);
      window.dispatchEvent(new Event("swapCreated"));

      // Auto-dismiss success message after 6 s
      setTimeout(() => setSuccessMsg(""), 6000);
    } catch (err) {
      console.error("createSwap error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">

      {/* ── Header Banner ── */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
          <Sparkles size={13} />
          <span>Post an Offer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create a New Skill Swap
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Share what you can teach and what you want to learn. Our automated matching
          system will find the best peers for you.
        </p>
      </div>

      {/* ── Success Toast ── */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <span>
            <strong>Success!</strong> {successMsg}
          </span>
        </div>
      )}

      {/* ── Error Toast ── */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
          <span>
            <strong>Error:</strong> {errorMsg}
          </span>
        </div>
      )}

      {/* ── Form Card ── */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Skills Exchange Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Skill You Want to Teach */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Skill You Want to Teach <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. React.js, Python, Spanish"
                value={formData.offeredSkill}
                onChange={handleChange("offeredSkill")}
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-60"
              />
            </div>

            {/* Skill You Want to Learn */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Skill You Want to Learn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Figma UI/UX, SEO Strategy"
                value={formData.wantedSkill}
                onChange={handleChange("wantedSkill")}
                disabled={isLoading}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all disabled:opacity-60"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  disabled={isLoading}
                  onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer disabled:opacity-60 ${
                    formData.category === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Options Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Expertise Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Your Level
              </label>
              <select
                value={formData.skillLevel}
                onChange={handleChange("skillLevel")}
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-60"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced / Expert</option>
              </select>
            </div>

            {/* Session Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Session Duration
              </label>
              <select
                value={formData.preferredDuration}
                onChange={handleChange("preferredDuration")}
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-60"
              >
                <option value="30 Mins">30 Minutes</option>
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hours">2 Hours</option>
              </select>
            </div>

            {/* Preferred Availability */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={handleChange("availability")}
                disabled={isLoading}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer disabled:opacity-60"
              >
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Flexible">Flexible Schedule</option>
              </select>
            </div>
          </div>

          {/* Description / Goals */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Offer Description &amp; Goals
            </label>
            <textarea
              rows={4}
              placeholder="Briefly describe what you plan to teach and what project or topics you hope to get help with..."
              value={formData.description}
              onChange={handleChange("description")}
              disabled={isLoading}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all resize-none disabled:opacity-60"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer disabled:cursor-not-allowed min-w-[130px] justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Publishing…</span>
                </>
              ) : (
                <>
                  <ArrowRightLeft size={14} />
                  <span>Publish Offer</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}