import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Target,
  HeartHandshake,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: "Barrier Free Learning",
      description:
        "Knowledge should never be locked behind expensive courses or subscriptions.",
    },
    {
      icon: HeartHandshake,
      title: "Direct Peer Trade",
      description:
        "Equal value exchanges where both parties teach and learn simultaneously.",
    },
    {
      icon: ShieldCheck,
      title: "Verified Community",
      description:
        "Built on peer ratings, skill verifications, and mutual accountability.",
    },
  ];

  const stats = [
    { value: "100%", label: "Free Peer Trade" },
    { value: "12k+", label: "Active Members" },
    { value: "45k+", label: "Hours Swapped" },
    { value: "50+", label: "Countries" },
  ];

  return (
    <div className="bg-white text-zinc-900 min-h-screen">
      {/* HEADER / HERO  */}
      <section className="pt-28 pb-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap size={14} />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950">
            Empowering growth through peer-to-peer exchange.
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed pt-2">
            SkillSwap was founded on a simple realization: everyone excels at
            something, and everyone wants to learn something new. We connect
            people directly so knowledge flows freely without monetary barriers.
          </p>
        </div>
      </section>

      {/* CORE MISSION & STATS */}
      <section className="bg-black text-white py-20 px-6 border-y border-zinc-800/80 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
                  <GraduationCap size={14} />
                  <span>Core Mission</span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Democratizing education for creators everywhere.
                </h2>

                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                  Whether you're a developer needing UI design, or a video
                  editor wanting to master AI prompts, SkillSwap gives you a
                  direct 1-on-1 partner to swap skills without spending a single
                  dollar.
                </p>

                <div className="pt-2">
                  <Link
                    to="/explore-skills"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-sm transition-all duration-200 group"
                  >
                    <span>Explore Skill Matching</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center flex flex-col justify-center items-center hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 group"
                  >
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-white py-24 px-6 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950">
              Our Core Values
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-2">
              The principles that guide how we build our platform and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-sky-50/60 border border-sky-100 p-8 rounded-3xl hover:border-sky-200 transition-colors shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
