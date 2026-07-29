import React from "react";
import { Zap, Award, ArrowUpRight, ArrowDownLeft, Gift } from "lucide-react";

export default function Credits() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Credits & Rewards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track earned credits from teaching and spend them on acquiring skills.
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
          <Zap size={16} className="fill-amber-300 text-amber-300" />
          <span>Available Balance</span>
        </div>
        <div className="text-3xl font-extrabold">120 Credits</div>
        <p className="text-xs text-blue-100">1 Credit = 1 Hour of personalized learning session</p>
      </div>

      {/* History */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Transaction History</h3>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <ArrowDownLeft size={16} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Taught React.js (Alex Rivera)</p>
                <p className="text-[11px] text-slate-400">Jul 28, 2026</p>
              </div>
            </div>
            <span className="font-bold text-emerald-600">+10 Credits</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                <ArrowUpRight size={16} />
              </div>
              <div>
                <p className="font-bold text-slate-900">Learned Figma UI (Marcus Vance)</p>
                <p className="text-[11px] text-slate-400">Jul 25, 2026</p>
              </div>
            </div>
            <span className="font-bold text-rose-600">-10 Credits</span>
          </div>
        </div>
      </div>
    </div>
  );
}