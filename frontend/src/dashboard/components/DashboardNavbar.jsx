import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  Check,
} from "lucide-react";

export default function DashboardNavbar({ setIsSidebarOpen }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // User details
  const userAvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const userName = "Andrew Sofia";

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Swap Request",
      message: "Alex Rivera wants to exchange UI Design for React.",
      time: "10m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Session Confirmed",
      message: "Sophia Chen accepted your session for tomorrow at 2:30 PM.",
      time: "2h ago",
      unread: true,
    },
    {
      id: 3,
      title: "New Review Received",
      message: "Marcus Vance left you a 5-star review!",
      time: "1d ago",
      unread: false,
    },
  ]);

  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Toggle Button & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block w-64 md:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search skills, mentors..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 relative transition-colors cursor-pointer"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full absolute top-1.5 right-1.5 border-2 border-white" />
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl py-3 z-50">
              <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] font-medium text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Check size={12} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 hover:bg-slate-50 transition-colors flex items-start gap-3 cursor-pointer ${
                        item.unread ? "bg-blue-50/40" : ""
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No notifications yet.
                  </div>
                )}
              </div>

              <div className="px-4 pt-2.5 border-t border-slate-100 text-center">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline block w-full py-1"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 pl-1 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center text-blue-700 font-bold text-xs">
            {userAvatarUrl ? (
              <img
                src={userAvatarUrl}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              "AS"
            )}
          </div>

          <div className="hidden md:block text-left">
            <h5 className="text-xs font-bold text-slate-900 leading-none">
              {userName}
            </h5>
            <span className="text-[10px] text-slate-500">Web Developer</span>
          </div>
        </Link>
      </div>
    </header>
  );
}