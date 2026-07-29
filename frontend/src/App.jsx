import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ExploreSkills from "./pages/ExploreSkills";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Dashboard Pages
import DashboardHome from "./dashboard/DashboardHome";
import ViewAllNotifications from "./dashboard/pages/ViewAllNotifications";
import PublicProfile from "./dashboard/pages/PublicProfile";
import ProfileSettings from "./dashboard/pages/ProfileSettings";
import Settings from "./dashboard/pages/Settings";
import DashboardExploreSkills from "./dashboard/pages/DashboardExploreSkills";
import Sessions from "./dashboard/pages/Sessions";
import MySwaps from "./dashboard/pages/MySwaps";
import Matches from "./dashboard/pages/Matches";
import Messages from "./dashboard/pages/Messages";
import Credits from "./dashboard/pages/Credits";

export default function App() {
  return (
    <Routes>
      {/* Public Pages with Main Navbar and Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore-skills" element={<ExploreSkills />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard Page*/}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route
          path="/dashboard/notifications"
          element={<ViewAllNotifications />}
        />
        <Route path="/dashboard/profile" element={<PublicProfile />} />
        <Route
          path="/dashboard/profile-settings"
          element={<ProfileSettings />}
        />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/explore" element={<DashboardExploreSkills />} />
        <Route path="/dashboard/sessions" element={<Sessions />} />
        <Route path="/dashboard/swaps" element={<MySwaps />} />
        <Route path="/dashboard/matches" element={<Matches />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/credits" element={<Credits />} />
      </Route>
    </Routes>
  );
}
