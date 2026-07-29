import React, { useState } from "react";
import {
  Search,
  Star,
  Clock,
  ArrowRightLeft,
  SlidersHorizontal,
  GraduationCap,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export default function DashboardExploreSkills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Development",
    "Design",
    "Marketing",
    "Languages",
    "Business",
  ];

  const mentors = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      rating: 4.9,
      reviewsCount: 24,
      category: "Development",
      offering: ["React.js", "TypeScript", "Node.js"],
      seeking: ["Figma UI/UX", "Design Systems"],
      totalHours: "32h taught",
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Growth Specialist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      rating: 4.8,
      reviewsCount: 18,
      category: "Marketing",
      offering: ["SEO Strategy", "Google Ads", "Content Growth"],
      seeking: ["Node.js Architecture", "PostgreSQL"],
      totalHours: "20h taught",
    },
    {
      id: 3,
      name: "Marcus Vance",
      role: "UI/UX Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      rating: 5.0,
      reviewsCount: 31,
      category: "Design",
      offering: ["Figma", "User Research", "Prototyping"],
      seeking: ["Spanish", "Basic Python"],
      totalHours: "45h taught",
    },
    {
      id: 4,
      name: "Elena Rostova",
      role: "Brand Graphic Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rating: 4.7,
      reviewsCount: 12,
      category: "Design",
      offering: ["Tailwind CSS", "Graphic Design", "Logo Art"],
      seeking: ["React Native", "Tailwind UI"],
      totalHours: "15h taught",
    },
  ];

  // Filtered list
  const filteredMentors = mentors.filter((m) => {
    const matchesCategory =
      selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.offering.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.seeking.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Light Header & Search Section */}
      <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-5 sm:p-6 space-y-5">
        
        {/* Header Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium mb-2 border border-blue-100">
              <Sparkles size={12} />
              <span>Community Marketplace</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Explore Skills & Mentors
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Connect with peers to swap knowledge and build new abilities together.
            </p>
          </div>
        </div>

        {/* Search Input & Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by skill or topic (e.g., React, Figma, SEO)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer w-full sm:w-auto shadow-2xs">
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>
        </div>

        {/* Light Category Tags */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white text-blue-600 font-semibold border border-blue-200 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            {/* User Details */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {mentor.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{mentor.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {mentor.rating}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({mentor.reviewsCount} reviews)
                    </span>
                    <span className="text-[10px] text-slate-300">•</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock size={10} />
                      {mentor.totalHours}
                    </span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium border border-slate-200/60">
                {mentor.category}
              </span>
            </div>

            {/* Skills Swapping Section */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Teaches:
                </p>
                <div className="flex flex-wrap gap-1">
                  {mentor.offering.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Wants to Learn:
                </p>
                <div className="flex flex-wrap gap-1">
                  {mentor.seeking.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-blue-100/70 text-blue-800 text-[10px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs">
                <ArrowRightLeft size={14} />
                <span>Propose Swap</span>
              </button>
              <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer">
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMentors.length === 0 && (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/80 space-y-2">
          <GraduationCap size={32} className="mx-auto text-slate-300" />
          <h3 className="text-sm font-bold text-slate-800">No mentors found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search terms or selecting another category.
          </p>
        </div>
      )}
    </div>
  );
}