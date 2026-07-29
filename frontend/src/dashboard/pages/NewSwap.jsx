import React, { useState } from "react";
import {
  Plus,
  ArrowRightLeft,
  Sparkles,
  Clock,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export default function NewSwap() {
  const [formData, setFormData] = useState({
    teachingSkill: "",
    learningSkill: "",
    skillLevel: "Intermediate",
    preferredDuration: "1 Hour",
    availability: "Weekends",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
          <Sparkles size={13} />
          <span>Post an Offer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create a New Skill Swap
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Share what you can teach and what you want to learn. Our automated matching system will find the best peers for you.
        </p>
      </div>

      {/* Success Notification */}
      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>
            <strong>Success!</strong> Your swap offer has been posted to the community feed.
          </span>
        </div>
      )}

      {/* Form Card */}
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
                value={formData.teachingSkill}
                onChange={(e) =>
                  setFormData({ ...formData, teachingSkill: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
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
                value={formData.learningSkill}
                onChange={(e) =>
                  setFormData({ ...formData, learningSkill: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all"
              />
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
                onChange={(e) =>
                  setFormData({ ...formData, skillLevel: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
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
                onChange={(e) =>
                  setFormData({ ...formData, preferredDuration: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
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
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
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
              Offer Description & Goals
            </label>
            <textarea
              rows={4}
              placeholder="Briefly describe what you plan to teach and what project or topics you hope to get help with..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  teachingSkill: "",
                  learningSkill: "",
                  skillLevel: "Intermediate",
                  preferredDuration: "1 Hour",
                  availability: "Weekends",
                  description: "",
                })
              }
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Reset
            </button>
            
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowRightLeft size={14} />
              <span>Publish Offer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}