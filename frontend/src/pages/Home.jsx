import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  Palette,
  Video,
  LineChart,
  Boxes,
  Cpu,
  UserPlus,
  MessageSquare,
  Zap,
  ArrowRight,
  GraduationCap,
  Loader2,
  Users,
  Repeat,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  // stats of the platform
  const stats = [
    {
      icon: Users,
      value: "12,000+",
      label: "Active Members",
      description: "Creators & devs swapping skills daily",
    },
    {
      icon: Repeat,
      value: "45,000+",
      label: "Hours Swapped",
      description: "Direct peer-to-peer learning time",
    },
    {
      icon: Star,
      value: "4.9 / 5.0",
      label: "Community Rating",
      description: "Based on 8,000+ member reviews",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Free Knowledge",
      description: "No subscription fees or hidden costs",
    },
  ];

  // steps for how it works
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Profile",
      description:
        "List the skills you master and the skills you want to learn in return.",
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Match & Connect",
      description:
        "Find peers in your domain who offer what you need and want what you offer.",
    },
    {
      number: "03",
      icon: Zap,
      title: "Trade & Grow",
      description:
        "Schedule 1-on-1 peer sessions and level up your skills without spending money.",
    },
  ];

  // categories for skill domains
  const categories = [
    {
      icon: Code2,
      title: "Web & Software Dev",
      description: "React, Node.js, Python, System Architecture",
      count: "1,200+ Members",
    },
    {
      icon: Palette,
      title: "UI/UX & Product Design",
      description: "Figma, Design Systems, Prototyping, Wireframing",
      count: "850+ Members",
    },
    {
      icon: Video,
      title: "Video & Motion Design",
      description: "After Effects, Premiere Pro, Color Grading",
      count: "620+ Members",
    },
    {
      icon: LineChart,
      title: "Marketing & Growth",
      description: "SEO, Content Strategy, Paid Ads, Analytics",
      count: "490+ Members",
    },
    {
      icon: Boxes,
      title: "3D Art & Modeling",
      description: "Blender, Cinema 4D, Unreal Engine, Texturing",
      count: "310+ Members",
    },
    {
      icon: Cpu,
      title: "AI & Data Science",
      description: "Machine Learning, Prompt Engineering, PyTorch",
      count: "740+ Members",
    },
  ];

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (err) {
        console.error("Newsletter API error:", err);
      }
      setSubscribed(true);
      setEmail("");
    }
  };


  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] pb-12 lg:pb-16 flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Left Side */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left pt-4 lg:pt-0"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-purple-300">
                <GraduationCap size={14} className="text-blue-600" />
                <span className="text-blue-400">
                  Peer-to-Peer Skill Exchange
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
                Trade Your Skills. <br />
                <span className="bg-gradient-to-r from-white bg-blue-200 to-blue-600 bg-clip-text text-transparent">
                  Save Your Money.
                </span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Teach what you master, learn what you need. Swap web dev for UI
                design, video editing for marketing, or backend code for 3D art.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#6c47ff]/25 flex items-center justify-center gap-2 group"
                >
                  <span>Start Swapping</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/explore-skills"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors duration-300 backdrop-blur-sm text-center"
                >
                  Browse Skills
                </Link>
              </div>

              <div className="pt-6 border-white/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    100%
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    Free Peer Trade
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    500+
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    Skills Listed
                  </p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    4.9★
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-mono">
                    Community Trust
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-5 relative h-[320px] sm:h-[450px] lg:h-[520px] w-full flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-2xl overflow-hidden"
            >
              {!is3DLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 text-xs font-mono bg-black/40 z-20 pointer-events-none">
                  <Loader2 size={24} className="animate-spin text-blue-600" />
                  <span>Loading 3D Scene...</span>
                </div>
              )}

              {/* Spline iframe */}
              <iframe
                src="https://my.spline.design/vectorshapecopycopy-bPC0H6NG0qYVBvTUFlPDhoU8-9bJ/"
                onLoad={() => setIs3DLoaded(true)}
                title="3D SkillSwap Scene"
                className="w-full h-full border-0 pointer-events-none"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  overflow: "hidden",
                }}
              />

              {/* Static badge overlay for hide Spline watermark */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-300 pointer-events-none z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Grow With Your Skills
                </span>
                <span>[ SkillSwap ]</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-white text-zinc-900 py-20 px-6 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              Proven Concept
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950">
              Trusted by creators learning without money.
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              SkillSwap eliminates paywalls from self-improvement. Here is how
              our community is growing right now.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl hover:border-zinc-300 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-6">
                    <Icon size={20} />
                  </div>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-sm font-semibold text-zinc-800 mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 leading-normal">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="bg-white py-24 px-6 border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-zinc-950">
              How SkillSwap Works in 3 Steps
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base mt-3 leading-relaxed">
              No subscription fees or paywalls. Just direct skill swapping with
              peers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="bg-white p-8 rounded-2xl border border-zinc-200/80 shadow-sm relative overflow-hidden group hover:border-zinc-300 transition-all duration-200"
                >
                  <span className="absolute top-4 right-6 text-5xl font-extrabold text-zinc-100 select-none">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 relative z-10 group-hover:scale-105 transition-transform duration-200">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed relative z-10">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Domains Section */}
      <section className="bg-black text-white py-24 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                Explore Domains
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
                Whatever you want to learn, someone is ready to trade.
              </h2>
            </div>

            <Link
              to="/explore-skills"
              className="self-start md:self-auto inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-full"
            >
              <span>View All Skills</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <Link to="/explore-skills">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="group relative bg-zinc-950 border border-zinc-800/80 p-6 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-500 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-colors">
                          <Icon size={20} />
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Available Peers</span>
                      <span className="text-zinc-300 font-semibold">
                        {cat.count}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Link>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="relative bg-zinc-50 text-zinc-900 pt-20 pb-24 px-6 overflow-hidden">
        {/* ice cream effect */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-12 sm:h-20 text-black fill-current"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-20 pt-8 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-14 border border-zinc-200 shadow-xl shadow-zinc-200/50 text-center relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6">
              <GraduationCap size={14} />
              <span>Stay In The Loop</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 max-w-2xl mx-auto leading-tight">
              Join the skill swapping revolution.
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
              Subscribe to our weekly dispatch for top skill matches, learning
              guides, and community highlights. No spam, ever.
            </p>

            <div className="mt-10 max-w-md mx-auto">
              {subscribed ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm"
                >
                  <CheckCircle2 size={20} className="text-emerald-600" />
                  <span>You're on the list! Check your inbox soon.</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-zinc-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group shrink-0 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>
              )}
            </div>

            {/* Subscribe Social Proof */}
            <p className="text-xs text-zinc-400 mt-6 font-medium">
              Join{" "}
              <span className="text-zinc-700 font-bold">4,000+ creators</span>{" "}
              already receiving our updates.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}