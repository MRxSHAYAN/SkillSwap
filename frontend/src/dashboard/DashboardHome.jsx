import React from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

export default function DashboardHome() {
  const stats = [
    {
      id: 1,
      name: "Swaps Completed",
      value: "24",
      subtext: "+3 this week",
      icon: BookOpen,
      badge: "Level 4 Mentor",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      name: "Total Hours",
      value: "48h",
      subtext: "28h Taught • 20h Learned",
      icon: Clock,
      badge: "Top 10%",
      accent: "from-violet-500 to-purple-600",
    },
    {
      id: 3,
      name: "Active Matches",
      value: "05",
      subtext: "2 pending approval",
      icon: Users,
      badge: "Active",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      name: "Rating Score",
      value: "4.9",
      subtext: "18 Community Reviews",
      icon: Star,
      badge: "Superstar",
      accent: "from-amber-400 to-orange-500",
    },
  ];

  const activeSwaps = [
    {
      id: 1,
      partner: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Full-Stack Developer",
      teaching: "React.js Advanced",
      learning: "Figma UI/UX Systems",
      nextSession: "Today, 4:00 PM",
      status: "Confirmed",
      progress: 75,
    },
    {
      id: 2,
      partner: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      role: "Growth Specialist",
      teaching: "Node.js Architecture",
      learning: "SEO & Growth Hacking",
      nextSession: "Tomorrow, 2:30 PM",
      status: "Pending",
      progress: 30,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Marcus Vance",
      avatar: "MV",
      action: "Completed 1-on-1 swap",
      details: "Spanish Conversation ↔ Python Basics",
      time: "2h ago",
      tag: "Completed",
    },
    {
      id: 2,
      user: "Elena Rostova",
      avatar: "ER",
      action: "Sent you a match proposal",
      details: "Graphic Design ↔ Tailwind CSS",
      time: "Yesterday",
      tag: "New Request",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      
      {/* 1. HERO BANNER WITH GRADIENT & USER RANK */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-xl shadow-slate-900/10">
        {/* Decorative Background Glowing Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-blue-300 text-xs font-semibold">
              <Zap size={14} className="text-amber-400 fill-amber-400" />
              <span>120 Credits Available</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready for your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Skill Swap?</span>
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              You have 2 sessions scheduled for this week. Keep swapping skills to level up your mentor badge.
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

      {/* 2. CUSTOM STATS CARDS WITH GRADIENT ICON HEADERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="group relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.accent} text-white shadow-md shadow-blue-500/10`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {stat.badge}
                </span>
              </div>

              <div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-700 mt-1">
                  {stat.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <TrendingUp size={12} className="text-emerald-500" />
                  <span>{stat.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Active Skill Exchanges */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <span>Active Skill Exchanges</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Your confirmed and upcoming 1-on-1 sessions</p>
            </div>
            
            <Link to="/dashboard/sessions" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
              <span>View Schedule</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {activeSwaps.map((swap) => (
              <div
                key={swap.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200 transition-all space-y-4"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={swap.avatar}
                      alt={swap.partner}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {swap.partner}
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {swap.role}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Next session: <span className="font-bold text-slate-800">{swap.nextSession}</span></p>
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

                {/* Skills Bar */}
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
                  <Link to="/dashboard/messages" className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                    <MessageSquare size={14} />
                    <span>Chat Partner</span>
                  </Link>
                  <Link to="/dashboard/room" className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 transition-all cursor-pointer">
                    Enter Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Activity Feed & Quick Hub */}
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles size={16} className="text-blue-600" />
              <span>Activity Stream</span>
            </h3>

            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {act.avatar}
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
          </div>

          {/* Community Challenge Widget */}
          <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-5 rounded-2xl text-white space-y-3 shadow-md shadow-indigo-500/20">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-300" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-100">Monthly Sprint</h4>
            </div>
            <h3 className="text-base font-extrabold">Teach 5 hours this week</h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Complete 2 more hours of teaching to unlock the <span className="font-bold text-white">Master Mentor</span> badge.
            </p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-300 h-full w-3/5 rounded-full" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}