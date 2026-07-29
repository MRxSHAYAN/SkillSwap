import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Star,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  Check,
} from "lucide-react";

export default function SwapDetails() {
  // Can be: "Pending", "Scheduled", "Completed", "Cancelled"
  const [status, setStatus] = useState("Pending"); 

  const swapData = {
    id: "SWAP-8921",
    createdAt: "July 28, 2026",
    scheduledTime: "Today, 4:00 PM - 5:00 PM (EST)",
    duration: "1 Hour (30m Teach / 30m Learn)",
    
    // Partner Details
    partner: {
      name: "Marcus Vance",
      title: "UI/UX & Design Systems Lead",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      totalSwaps: 31,
      badge: "Master Mentor",
      skillOffering: "Figma UI/UX & Prototyping",
    },

    mySkillOffering: "React.js & Tailwind CSS",
    notes: "We will spend the first 30 minutes reviewing Figma component variants, and the remaining 30 minutes building responsive React components using Tailwind CSS.",
  };

  const handleAccept = () => {
    setStatus("Scheduled");
  };

  const handleDecline = () => {
    setStatus("Cancelled");
  };

  return (
    <div className="w-full space-y-6 pb-12">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to My Swaps</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">
            Swap ID: <strong className="text-slate-800">{swapData.id}</strong>
          </span>
          <span className="h-3 w-px bg-slate-300" />
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === "Scheduled"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : status === "Completed"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : status === "Pending"
                ? "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            ● {status}
          </span>
        </div>
      </div>

      {/* Pending Accept Banner Notice */}
      {status === "Pending" && (
        <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Incoming Swap Request
              </h3>
              <p className="text-xs text-amber-800/80">
                {swapData.partner.name} wants to swap skills with you. Review details below to accept or decline.
              </p>
            </div>
          </div>

          {/* Quick Accept Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check size={16} />
              <span>Accept Swap</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Skill Exchange Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Skill Exchange Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ArrowRightLeft size={18} className="text-blue-600" />
                <span>Skill Exchange Match</span>
              </h2>
              <span className="text-xs text-slate-400">Created {swapData.createdAt}</span>
            </div>

            {/* Exchange Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
                  You Teach
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {swapData.mySkillOffering}
                </h3>
                <p className="text-xs text-slate-500">
                  30 minutes dedicated session
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-extrabold uppercase tracking-wider">
                  You Learn
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {swapData.partner.skillOffering}
                </h3>
                <p className="text-xs text-slate-500">
                  30 minutes dedicated session
                </p>
              </div>
            </div>

            {/* Session Time & Location Details */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold">
                  <Calendar size={14} />
                  <span>Scheduled Session</span>
                </div>
                <p className="text-sm font-bold">{swapData.scheduledTime}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {swapData.duration}
                </p>
              </div>

              {/* Live Call Room Button (Active after accepting) */}
              {status === "Scheduled" ? (
                <a
                  href="/dashboard/room"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shrink-0"
                >
                  <Video size={16} />
                  <span>Join Live Room</span>
                </a>
              ) : (
                <button
                  disabled
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold flex items-center justify-center gap-2 cursor-not-allowed shrink-0 border border-slate-700"
                >
                  <Video size={16} />
                  <span>Room Locked</span>
                </button>
              )}
            </div>
          </div>

          {/* Agenda & Notes */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Session Goals & Notes</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              "{swapData.notes}"
            </p>
          </div>
        </div>

        {/* Right Column: Partner & Controls */}
        <div className="space-y-6">
          
          {/* Partner Profile Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Swap Partner
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={swapData.partner.avatar}
                alt={swapData.partner.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {swapData.partner.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {swapData.partner.title}
                </p>
                <div className="flex items-center gap-1 text-amber-600 text-xs font-bold mt-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{swapData.partner.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({swapData.partner.totalSwaps} swaps)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                {swapData.partner.badge}
              </span>
              <a
                href="/dashboard/messages"
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare size={14} />
                <span>Message</span>
              </a>
            </div>
          </div>

          {/* Manage Swap Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs p-6 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Manage Swap
            </h3>

            {status === "Pending" && (
              <button
                onClick={handleAccept}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <CheckCircle2 size={16} />
                <span>Accept Swap Request</span>
              </button>
            )}

            {status === "Scheduled" && (
              <button
                onClick={() => setStatus("Completed")}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <CheckCircle2 size={16} />
                <span>Mark as Completed</span>
              </button>
            )}

            {status !== "Cancelled" && (
              <button
                onClick={handleDecline}
                className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <XCircle size={16} />
                <span>{status === "Pending" ? "Decline Request" : "Cancel Swap"}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}