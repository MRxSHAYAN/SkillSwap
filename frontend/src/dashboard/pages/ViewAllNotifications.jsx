import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCheck, Bell, Loader2, Filter } from "lucide-react";

function getTimeAgo(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export default function ViewAllNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [filter, setFilter]               = useState("all"); // 'all' | 'unread'

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setNotifications(json.data || []);
      }
    } catch (err) {
      console.error("fetchNotifications error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    try {
      await fetch("/api/notifications/read-all", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("markAllAsRead error:", err);
    }
  };

  const handleNotificationClick = async (notif) => {
    const token = localStorage.getItem("token");

    if (!notif.read && token) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, read: true } : n))
      );

      try {
        await fetch(`/api/notifications/${notif._id}/read`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("markAsRead error:", err);
      }
    }

    if (notif.link) {
      navigate(notif.link);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 space-y-6 pb-12">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
            <p className="text-xs text-slate-500">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
        </div>

        {/* TOP ACTIONS */}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-xl"
          >
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* ── FILTER PILLS ── */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "all"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            filter === "unread"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* ── NOTIFICATION LIST ── */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-4 rounded-xl bg-white border border-slate-200/80 animate-pulse space-y-2"
            >
              <div className="h-4 w-44 bg-slate-200 rounded" />
              <div className="h-3 w-64 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((n) => {
            const isUnread = !n.read;

            return (
              <div
                key={n._id}
                onClick={() => handleNotificationClick(n)}
                className={`p-4 flex items-start gap-3 transition-all cursor-pointer rounded-2xl border ${
                  isUnread
                    ? "bg-blue-50/50 border-blue-200/80 shadow-2xs"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {/* Unread Indicator */}
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    isUnread ? "bg-blue-600" : "bg-transparent"
                  }`}
                />

                {/* Notification Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      {n.type?.replace("_", " ")}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {getTimeAgo(n.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {n.message}
                  </p>

                  <div className="pt-1">
                    <span className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="py-16 text-center text-slate-400 space-y-2 bg-white rounded-2xl border border-slate-200/80">
          <Bell size={32} className="mx-auto opacity-40 text-slate-400" />
          <p className="text-sm font-bold text-slate-700">No notifications found</p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            {filter === "unread"
              ? "You have read all your notifications."
              : "Notifications will appear here when peers send swap requests or respond to your proposals."}
          </p>
        </div>
      )}
    </div>
  );
}