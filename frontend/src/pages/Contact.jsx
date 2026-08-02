import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  User,
  Send,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function ContactUs() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "General", label: "General Talk", icon: MessageSquare },
    { id: "Support", label: "Match Support", icon: Zap },
    { id: "Partnership", label: "Partnerships", icon: Sparkles },
  ];

  const quickStats = [
    {
      title: "Community Discord",
      detail: "12,000+ Active Members",
      tag: "Live Chat",
      icon: MessageCircle,
      action: "Join Discord",
    },
    {
      title: "Direct Support",
      detail: "support@skillswap.io",
      tag: "< 2hr Average",
      icon: Mail,
      action: "Send Email",
    },
    {
      title: "Platform Status",
      detail: "All Systems Operational",
      tag: "99.9% Uptime",
      icon: Clock,
      action: "View Status",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Light Blue Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-blue-400/10 via-sky-300/20 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-md text-xs font-semibold text-blue-700 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span>Support Engine Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900"
          >
            How can we <br />
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
              help you today?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base mt-4 max-w-xl leading-relaxed"
          >
            Have a question about skill matching or platform features? Drop us a message below or connect with our active community.
          </motion.p>
        </div>

        {/* TOP STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {quickStats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40 hover:border-blue-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base flex items-center justify-between">
                {item.title}
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </h3>
              <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* MAIN INTERACTIVE FORM CARD */}
        <div className="rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/60 p-8 sm:p-12 relative overflow-hidden">

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Message Delivered!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                Thanks for reaching out! A member of our team will get back to your email shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setError(""); }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  <span>{error}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Name</label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Message Details</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you out?"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>Secure Direct Transport</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* BOTTOM FAQ ACCORDION SUMMARY */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "Is SkillSwap really 100% free?",
              a: "Yes! SkillSwap operates on a peer-to-peer time exchange model. You earn learning hours by teaching others."
            },
            {
              q: "How do session matches work?",
              a: "Our engine matches you with creators based on complementary skills, time availability, and learning goals."
            }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle size={16} className="text-blue-600 shrink-0" />
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}