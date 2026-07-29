import React, { useState } from "react";
import {
  Trophy,
  Star,
  Sparkles,
  Search,
} from "lucide-react";

export default function SSPleaderboard() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [searchTerm, setSearchTerm] = useState("");

  const leaderboardData = [
    {
      rank: 1,
      name: "Marcus Vance",
      title: "UI/UX Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      hoursTaught: 45,
      swapsCompleted: 31,
      rating: 5,
      badge: "Master Mentor",
      topSkill: "Figma & Prototyping",
    },
    {
      rank: 2,
      name: "Alex Rivera",
      title: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      hoursTaught: 32,
      swapsCompleted: 24,
      rating: 4.9,
      badge: "Level 4 Mentor",
      topSkill: "React.js & Node.js",
    },
    {
      rank: 3,
      name: "Sophia Chen",
      title: "Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      hoursTaught: 28,
      swapsCompleted: 20,
      rating: 4.8,
      badge: "Growth Guru",
      topSkill: "SEO & Strategy",
    },
    {
      rank: 4,
      name: "Elena Rostova",
      title: "Tailwind CSS",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      hoursTaught: 22,
      swapsCompleted: 15,
      rating: 4.7,
      badge: "Rising Star",
      topSkill: "Tailwind CSS",
    },
    {
      rank: 5,
      name: "Liam O'Connor",
      title: "Python & AI Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      hoursTaught: 19,
      swapsCompleted: 14,
      rating: 4.9,
      badge: "Code Wizard",
      topSkill: "Python & ML",
    },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const remainingMentors = leaderboardData.slice(3).filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topSkill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* Changed from max-w-5xl to w-full for edge-to-edge layout */
    <div className="w-full space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-blue-600 text-white p-6 sm:p-8 rounded-3xl shadow-xs space-y-3 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
              <Trophy size={14} className="text-amber-300" />
              <span>SkillSwap Hall of Fame</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Community Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Recognizing our top mentors who actively contribute knowledge and help the community grow.
            </p>
          </div>

          {/* Time Filter Pills */}
          <div className="flex bg-white/15 backdrop-blur-md p-1 rounded-2xl border border-white/20 text-xs self-start sm:self-auto">
            {["weekly", "monthly", "all time"].map((type) => (
              <button
                key={type}
                onClick={() => setTimeframe(type)}
                className={`px-4 py-2 rounded-xl font-semibold capitalize transition-all cursor-pointer ${
                  timeframe === type
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-2">
        {/* 2nd Place */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-3 order-2 md:order-1">
          <div className="relative">
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
            />
            <span className="absolute -bottom-1 -right-1 bg-slate-200 text-slate-800 text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              2
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{topThree[1].name}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{topThree[1].title}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
            {topThree[1].badge}
          </span>
          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">{topThree[1].hoursTaught}h</p>
              <p className="text-[10px] text-slate-400">Taught</p>
            </div>
            <div>
              <p className="font-bold text-amber-600 flex items-center gap-0.5">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {topThree[1].rating}
              </p>
              <p className="text-[10px] text-slate-400">Rating</p>
            </div>
          </div>
        </div>

        {/* 1st Place (#1 Top Mentor) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 shadow-sm flex flex-col items-center text-center space-y-3 order-1 md:order-2 relative">
          <div className="absolute -top-3 px-3.5 py-1 rounded-full bg-amber-400 text-amber-950 text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-2xs">
            <Sparkles size={12} /> #1 TOP MENTOR
          </div>
          <div className="relative pt-2">
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-400"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-xs font-extrabold w-7 h-7 rounded-full flex items-center justify-center border-2 border-white">
              1
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{topThree[0].name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{topThree[0].title}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            {topThree[0].badge}
          </span>
          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
            <div>
              <p className="font-extrabold text-slate-900 text-sm">{topThree[0].hoursTaught}h</p>
              <p className="text-[10px] text-slate-400">Taught</p>
            </div>
            <div>
              <p className="font-extrabold text-amber-600 text-sm flex items-center gap-0.5">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {topThree[0].rating}
              </p>
              <p className="text-[10px] text-slate-400">Rating</p>
            </div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col items-center text-center space-y-3 order-3">
          <div className="relative">
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-700/30"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-700/80 text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{topThree[2].name}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{topThree[2].title}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
            {topThree[2].badge}
          </span>
          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">{topThree[2].hoursTaught}h</p>
              <p className="text-[10px] text-slate-400">Taught</p>
            </div>
            <div>
              <p className="font-bold text-amber-600 flex items-center gap-0.5">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {topThree[2].rating}
              </p>
              <p className="text-[10px] text-slate-400">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Rankings Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Full Rankings</h2>
          <div className="relative w-full sm:w-80">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search mentor or skill..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          {remainingMentors.map((mentor) => (
            <div
              key={mentor.rank}
              className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50/80 transition-colors border border-slate-100"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-6 text-center text-xs font-bold text-slate-400">
                  #{mentor.rank}
                </span>
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{mentor.name}</h4>
                  <p className="text-[11px] text-slate-500">{mentor.topSkill}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-slate-800">{mentor.swapsCompleted} Swaps</p>
                  <p className="text-[10px] text-slate-400">{mentor.hoursTaught}h taught</p>
                </div>
                <div className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/60 text-xs">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{mentor.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}