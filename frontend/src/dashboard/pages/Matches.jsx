import React from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, ArrowRightLeft, Sparkles } from "lucide-react";

export default function Matches() {
  const matches = [
    {
      id: 1,
      name: "Elena Rostova",
      role: "Brand Graphic Designer",
      matchScore: "95% Match",
      reason:
        "She wants React.js (You offer it) & offers Tailwind CSS (You want it).",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "UI/UX Product Designer",
      matchScore: "88% Match",
      reason: "He offers Figma prototyping which matches your learn wishlist.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
  ];

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

      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={match.avatar}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {match.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <Sparkles size={10} /> {match.matchScore}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{match.role}</p>
                <p className="text-xs text-slate-600 mt-1 italic">
                  {match.reason}
                </p>
              </div>
            </div>
            <Link 
            to={`/dashboard/messages`}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer">
              <ArrowRightLeft size={14} />
              <span>Connect</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
