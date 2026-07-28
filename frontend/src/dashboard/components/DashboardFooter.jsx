import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { MessageSquarePlus, ExternalLink, Heart } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Copyright */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
          <span className="font-semibold text-slate-700">SkillSwap</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-slate-500">
            Empowering peer-to-peer skill exchange worldwide.
          </span>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Back to Public Site Link */}
          <Link
            to="/"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Main Website</span>
            <ExternalLink size={13} className="text-slate-400" />
          </Link>

          <span className="text-slate-200">|</span>

          {/* Feedback Trigger */}
          <HashLink
            smooth
            to="/reviews#feedback-form"
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Send Feedback</span>
          </HashLink>
        </div>
      </div>
    </footer>
  );
}
