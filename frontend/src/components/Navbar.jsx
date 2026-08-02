import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black ${
        scrolled
          ? "py-3 border-b border-white/10 shadow-2xl"
          : "py-5 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="SkillSwap Logo"
              className="h-10 w-10 object-contain transition-transform duration-300 hover:scale-105"
            />
            <span
              className="font-extrabold text-xl tracking-wide text-white"
              style={{ fontFamily: "'Zen Dots', cursive" }}
            >
              SkillSwap
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              About Us
            </Link>

            <Link
              to="/explore-skills"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              Explore Skills
            </Link>

            <Link
              to="/Reviews"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              Reviews
            </Link>


            <Link
              to="/contact"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              Contact us
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-100  hover:text-white transition-colors"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <Sparkles size={14} className="text-purple-200" />
              <span>Get Started</span>
            </Link>
          </div>

          <button
            className="md:hidden text-gray-100  hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-black border-b border-white/10 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-4 text-sm font-medium text-gray-100 ">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                About
              </Link>
              <Link
                to="/explore-skills"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                Explore Skills
              </Link>
              <Link
                to="/Reviews"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                Reviews
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                Contact
              </Link>

              <hr className="border-white/10 my-1" />

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-white"
              >
                Log In
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 text-white text-center py-2.5 rounded-full font-semibold"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
