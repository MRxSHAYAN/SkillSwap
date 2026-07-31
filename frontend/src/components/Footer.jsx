import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { ArrowUpRight, Heart } from "lucide-react";
import { FaGithub, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />

      {/* Scroll Animated Container */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src={logo}
                alt="SkillSwap logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                SkillSwap
              </span>
            </Link>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Swap skills, build real projects, and bypass the traditional
              grind. Pure peer-to-peer learning with zero fluff.
            </p>

            {/* Gen-Z Micro Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-gray-300 font-mono">
                ⚡ 100% Peer-to-Peer
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-gray-300 font-mono">
                🚀 No Cap, Just Code
              </span>
            </div>
          </div>

          {/* Navigation Links using React Router Link */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400">
              // Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/explore-skills"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer "
                >
                  <span>Explore Skills</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              </li>
              <li>
                <HashLink
                  smooth
                  to="/#how-it-works"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
                >
                  <span>How It Works</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                </HashLink>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
                >
                  <span>Reviews</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/leaderboard"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center gap-1 group cursor-pointer"
                >
                  <span>Leaderboard</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  />
                </Link>
              </li>

            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400">
              // Community Vibes
            </h4>
            <p className="text-xs text-gray-400">
              Hop into our socials, collaborate on builds, or connect with
              creators worldwide.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {[
                {
                  icon: FaTwitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: FaDiscord,
                  href: "https://discord.com",
                  label: "Discord",
                },
                { icon: FaGithub, href: "https://github.com", label: "GitHub" },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-black hover:bg-white transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs hover:text-white transition-colors">
          <div className="flex items-center gap-1">
            <span>
              Grow Together with your own skills, learn from peers, and build
              real projects.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="text-white font-mono hover:underline flex items-center gap-1 cursor-pointer"
            >
              [Back to top ↑]
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
