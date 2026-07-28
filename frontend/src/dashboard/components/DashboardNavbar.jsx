import React from "react";
import { Menu, Bell, Search, User } from "lucide-react";

export default function DashboardNavbar({ setIsSidebarOpen }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Toggle Button & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 lg:hidden"
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
        {/* Notifications Button */}
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 relative transition-colors">
          <Bell size={18} />
          <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-2 right-2 border-2 border-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1" />

        {/* User Profile  */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-xs">
            SJ
          </div>
          <div className="hidden md:block text-left">
            <h5 className="text-xs font-bold text-slate-900 leading-none">
              Sarah Jenkins
            </h5>
            <span className="text-[10px] text-slate-500">React Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
}