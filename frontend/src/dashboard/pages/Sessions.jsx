import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

export default function Sessions() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const sessions = [
    {
      id: 1,
      partner: "Alex Rivera",
      partnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      teaching: "React.js Advanced",
      learning: "Figma UI/UX Systems",
      date: "Today",
      time: "4:00 PM - 5:00 PM",
      status: "confirmed",
      meetLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      partner: "Sophia Chen",
      partnerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      teaching: "Node.js Architecture",
      learning: "SEO & Growth Hacking",
      date: "Tomorrow",
      time: "2:30 PM - 3:30 PM",
      status: "pending",
      meetLink: null,
    },
    {
      id: 3,
      partner: "Marcus Vance",
      partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      teaching: "Spanish Conversation",
      learning: "Python Basics",
      date: "Jul 25, 2026",
      time: "11:00 AM - 12:00 PM",
      status: "completed",
      meetLink: null,
    },
  ];

  const filteredSessions = sessions.filter((s) =>
    activeTab === "upcoming" ? s.status !== "completed" : s.status === "completed"
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Session Scheduler
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track and join your 1-on-1 skill exchange video calls.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === "upcoming"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Upcoming Sessions
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
            activeTab === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Past Sessions
        </button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={session.partnerAvatar}
                alt={session.partner}
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{session.partner}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      session.status === "confirmed"
                        ? "bg-emerald-100 text-emerald-800"
                        : session.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-emerald-600">Teaching:</span> {session.teaching} •{" "}
                  <span className="font-semibold text-blue-600">Learning:</span> {session.learning}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1">
                    <CalendarIcon size={12} /> {session.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {session.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {session.meetLink && (
                <Link
                  to="/dashboard/room"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Video size={14} />
                  <span>Enter Room</span>
                </Link>
              )}
              {session.status === "pending" && (
                <span className="text-xs text-slate-400 italic">Awaiting acceptance</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}