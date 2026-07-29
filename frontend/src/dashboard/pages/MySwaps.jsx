import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRightLeft,
} from "lucide-react";

export default function MySwaps() {
  const swaps = [
    {
      id: 1,
      title: "React.js ↔ Figma UI/UX",
      partner: "Alex Rivera",
      hoursExchanged: 6,
      status: "Active",
      progress: "3 / 5 Sessions Done",
    },
    {
      id: 2,
      title: "Node.js ↔ SEO Growth",
      partner: "Sophia Chen",
      hoursExchanged: 2,
      status: "Active",
      progress: "1 / 4 Sessions Done",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Swaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your ongoing and completed skill exchange agreements.
          </p>
        </div>
        <Link
          to="/dashboard/new-swap"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
        >
          <Plus size={15} />
          <span>New Swap Offer</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {swaps.map((swap) => (
          <div
            key={swap.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                {swap.status}
              </span>
              <span className="text-xs text-slate-400">
                {swap.hoursExchanged}h Total
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{swap.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                Partner: {swap.partner}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>{swap.progress}</span>
              <Link 
              to={`/dashboard/swap-details`}
              className="text-blue-600 font-semibold hover:underline cursor-pointer">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
