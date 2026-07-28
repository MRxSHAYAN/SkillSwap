// React
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Component
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page
import Home from "./pages/Home";
import About from "./pages/About";
import ExploreSkills from "./pages/ExploreSkills";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      {/* Navbar at top */}
      <Navbar />

      {/* Main Content expands to push footer down */}
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore-skills" element={<ExploreSkills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
