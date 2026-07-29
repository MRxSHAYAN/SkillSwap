import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCheck, Trash2, Bell } from "lucide-react";

export default function ViewAllNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Swap Proposal",
      message: "Alex Rivera wants to exchange UI Design for React.js.",
      time: "10m ago",
      unread: true,
      link: "/dashboard",
    },
    {
      id: 2,
      title: "Session Confirmed",
      message: "Sophia Chen accepted your session request for tomorrow at 2:30 PM.",
      time: "2h ago",
      unread: true,
      link: "/dashboard",
    },
    {
      id: 3,
      title: "New Review Received",
      message: 'Marcus Vance left you a 5-star review: "Exceptionally patient mentor!"',
      time: "1d ago",
      unread: false,
      link: "/reviews",
    },
    {
      id: 4,
      title: "Credits Earned",
      message: "You earned +10 Credits for completing a 1-hour teaching session.",
      time: "2d ago",
      unread: false,
      link: "/dashboard",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markSingleAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
        </div>

        {/* TOP ACTIONS */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={markAllAsRead}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck size={14} />
              <span>Mark all read</span>
            </button>
            <button
              onClick={clearAll}
              className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              title="Clear all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* NOTIFICATION LIST */}
      <div className="divide-y divide-slate-100">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markSingleAsRead(n.id)}
              className={`py-4 px-3 flex items-start gap-3 transition-colors cursor-pointer rounded-xl ${
                n.unread ? "bg-blue-50/50" : "hover:bg-slate-50"
              }`}
            >
              {/* Blue dot indicator for unread */}
              <span
                className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  n.unread ? "bg-blue-600" : "bg-transparent"
                }`}
              />

              {/* Notification Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {n.title}
                  </h4>
                  <span className="text-xs text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  {n.message}
                </p>

                {/* Direct Action Link */}
                <Link
                  to={n.link}
                  className="inline-block mt-2 text-xs font-semibold text-blue-600 hover:underline"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))
        ) : (
          /* EMPTY STATE */
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Bell size={28} className="mx-auto opacity-50" />
            <p className="text-sm font-medium">No notifications left</p>
          </div>
        )}
      </div>

    </div>
  );
}