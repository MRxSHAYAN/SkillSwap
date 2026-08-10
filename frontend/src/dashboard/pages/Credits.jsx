import React, { useState, useEffect } from "react";
import { Zap, ArrowUpRight, ArrowDownLeft, Loader2, AlertCircle, History } from "lucide-react";
import { apiFetch } from "../../utils/apiFetch";

export default function Credits() {
  const [credits, setCredits] = useState(100);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCredits = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiFetch("/api/credits");
        if (isMounted) {
          setCredits(data.credits ?? 100);
          setTransactions(data.transactions || []);
        }
      } catch (err) {
        console.error("Credits Fetch Error:", err);
        if (isMounted) {
          setError("Unable to load credit details. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCredits();
    return () => {
      isMounted = false;
    };
  }, []);

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

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
          <AlertCircle size={16} className="shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white space-y-2 relative overflow-hidden shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-100">
          <Zap size={16} className="fill-amber-300 text-amber-300" />
          <span>Available Balance</span>
        </div>
        <div className="text-3xl font-extrabold flex items-center gap-2">
          {loading ? <Loader2 size={24} className="animate-spin text-white/80" /> : `${credits} Credits`}
        </div>
        <p className="text-xs text-blue-100">1 Credit = 1 Hour of personalized learning session</p>
      </div>

      {/* History */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <History size={16} className="text-slate-500" />
            <span>Transaction History</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">
            {transactions.length} {transactions.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-14 bg-slate-100 rounded-xl" />
            <div className="h-14 bg-slate-100 rounded-xl" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
            <p className="text-xs font-semibold text-slate-600">No transactions yet</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              Complete your first skill swap session to earn or spend credits!
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            {transactions.map((tx) => {
              const isEarned = tx.type === "EARNED";
              const formattedDate = tx.createdAt
                ? new Date(tx.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <div
                  key={tx._id || Math.random()}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 hover:bg-slate-50 border border-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isEarned
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {isEarned ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        {tx.description} {tx.partnerName ? `(${tx.partnerName})` : ""}
                      </p>
                      <p className="text-[11px] text-slate-400">{formattedDate}</p>
                    </div>
                  </div>
                  <span
                    className={`font-bold ${
                      isEarned ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {isEarned ? `+${tx.amount}` : `-${tx.amount}`} Credits
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}