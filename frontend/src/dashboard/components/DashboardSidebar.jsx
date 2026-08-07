import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Compass, 
  PlusCircle,
  Calendar, 
  BookOpen,
  Users,
  MessageSquare,
  Zap, 
  Trophy,
  Bell,
  User,
  Settings,
  Video,
  LogOut,
  X,
  GraduationCap,
} from "lucide-react";

export default function DashboardSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

 const mainNavItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "New Swap", path: "/dashboard/new-swap", icon: PlusCircle },
  { name: "My Swaps", path: "/dashboard/swaps", icon: BookOpen },
  { name: "Explore Skills", path: "/dashboard/explore", icon: Compass },
  { name: "Matches", path: "/dashboard/matches", icon: Users },
  { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
  { name: "Credits & Rewards", path: "/dashboard/credits", icon: Zap },
  { name: "Leaderboard", path: "/dashboard/leaderboard", icon: Trophy },
];

  const bottomNavItems = [
    { name: "My Profile", path: "/dashboard/profile", icon: User },
    { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex flex-col gap-6 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <GraduationCap size={20} />
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                SkillSwap
              </span>
            </Link>

            {/* Close Button on Mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Menu
            </p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-50 text-blue-600 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-blue-600" : "text-slate-400"}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-5 border-t border-slate-100 space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Preferences
          </p>

          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={active ? "text-blue-600" : "text-slate-400"}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut size={18} className="text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
