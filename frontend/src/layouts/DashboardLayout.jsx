import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/components/DashboardSidebar";
import DashboardNavbar from "../dashboard/components/DashboardNavbar"; // Optional top bar
import Footer from "../dashboard/components/DashboardFooter";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />
        {/* Optional top bar */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Optional bottom bar */}
        <Footer />
      </div>
    </div>
  );
}
