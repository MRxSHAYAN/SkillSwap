import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Layouts
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
import NewSwap from "./dashboard/pages/NewSwap";
import DashboardExploreSkills from "./dashboard/pages/DashboardExploreSkills";
import Sessions from "./dashboard/pages/Sessions";
import MySwaps from "./dashboard/pages/MySwaps";
import Matches from "./dashboard/pages/Matches";
import Messages from "./dashboard/pages/Messages";
import Credits from "./dashboard/pages/Credits";
import SSPLeaderboard from "./dashboard/pages/SSPLeaderboard";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore-skills" element={<ExploreSkills />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="notifications" element={<ViewAllNotifications />} />
          <Route path="profile" element={<PublicProfile />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="new-swap" element={<NewSwap />} />
          <Route path="explore" element={<DashboardExploreSkills />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="swaps" element={<MySwaps />} />
          <Route path="matches" element={<Matches />} />
          <Route path="messages" element={<Messages />} />
          <Route path="credits" element={<Credits />} />
          <Route path="leaderboard" element={<SSPLeaderboard />} />
        </Route>
      </Routes>
    </>
  );
}