import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../dashboard/components/DashboardSidebar";
import DashboardNavbar from "../dashboard/components/DashboardNavbar"; // Optional top bar
import Footer from "../dashboard/components/DashboardFooter";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    /* Changed min-h-screen to h-screen overflow-hidden to lock outer viewport */
    <div className="h-screen flex overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar - Stays fixed on the left */}
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Navbar - Stays fixed at top */}
        <DashboardNavbar setIsSidebarOpen={setIsSidebarOpen} />

        {/* Scrollable Main Area - ONLY this section will scroll */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer - Stays fixed at bottom */}
        <Footer />
      </div>
    </div>
  );
}