import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <Navbar />
      <main className="flex-1">
        {/* Outlet renders child routes like Home, About, Login, etc. */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}