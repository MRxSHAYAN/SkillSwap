import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  GraduationCap,
  Filter,
  Star,
  ArrowUpRight,
  Code2,
  Palette,
  Video,
  LineChart,
  Boxes,
  Cpu,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Music,
  Camera,
  Dumbbell,
  PenTool,
  Brush,
  UserRound,
  ShieldCheck,
} from "lucide-react";

export default function ExploreSkills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", icon: GraduationCap },
    { name: "Development", icon: Code2 },
    { name: "Design", icon: Palette },
    { name: "Video & Motion", icon: Video },
    { name: "Marketing", icon: LineChart },
    { name: "3D & FX", icon: Boxes },
    { name: "AI & Data", icon: Cpu },
    { name: "Music", icon: Music },
    { name: "Photography", icon: Camera },
    { name: "Health & Fitness", icon: Dumbbell },
    { name: "Writing", icon: PenTool },
    { name: "Art & Design", icon: Brush },
    { name: "Personal Development", icon: UserRound },
    { name: "Cybersecurity", icon: ShieldCheck },
  ];

  const skillCards = [
    {
      id: 1,
      title: "React & Next.js Frontend Dev",
      category: "Development",
      offers: "React, Tailwind, State Management",
      wants: "Figma UI/UX Design",
      user: "Alex Chen",
      role: "Frontend Engineer",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: "4.9",
      reviews: 24,
      level: "Advanced",
    },
    {
      id: 2,
      title: "Figma Design System & Prototyping",
      category: "Design",
      offers: "Figma, UI Kit, Wireframing",
      wants: "Node.js & Express Backend",
      user: "Sarah Jenkins",
      role: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: "5.0",
      reviews: 38,
      level: "Expert",
    },
    {
      id: 3,
      title: "Short-form Video Editing & FX",
      category: "Video & Motion",
      offers: "Premiere Pro, CapCut, Color Grading",
      wants: "SEO & Growth Strategy",
      user: "Marcus Vance",
      role: "Content Creator",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: "4.8",
      reviews: 19,
      level: "Intermediate",
    },
    {
      id: 4,
      title: "SEO & Content Marketing Growth",
      category: "Marketing",
      offers: "Technical SEO, Keyword Research",
      wants: "Python for Data Analysis",
      user: "Elena Rostova",
      role: "Growth Marketer",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      rating: "4.9",
      reviews: 31,
      level: "Advanced",
    },
    {
      id: 5,
      title: "Blender 3D Asset Modeling",
      category: "3D & FX",
      offers: "Blender, Texturing, Lighting",
      wants: "React Native Mobile Dev",
      user: "David Kim",
      role: "3D Artist",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: "5.0",
      reviews: 15,
      level: "Advanced",
    },
    {
      id: 6,
      title: "AI Prompt Engineering & PyTorch",
      category: "AI & Data",
      offers: "LLM Fine-tuning, Prompt Design",
      wants: "3D Character Animation",
      user: "Priya Sharma",
      role: "AI Researcher",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      rating: "4.9",
      reviews: 42,
      level: "Expert",
    },
    {
      id: 7,
      title: "Guitar Lessons & Music Production",
      category: "Music",
      offers: "Acoustic Guitar, Music Theory, Beat Making",
      wants: "Website Development",
      user: "Maya Rodriguez",
      role: "Music Producer",
      avatar:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=200",
      rating: "4.8",
      reviews: 27,
      level: "Advanced",
    },
    {
      id: 8,
      title: "Piano Performance & Composition",
      category: "Music",
      offers: "Piano, Songwriting, Music Arrangement",
      wants: "Video Editing Skills",
      user: "Lucas Anderson",
      role: "Composer",
      avatar:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=200",
      rating: "5.0",
      reviews: 34,
      level: "Expert",
    },
    {
      id: 9,
      title: "Professional Photography",
      category: "Photography",
      offers: "Portrait Photography, Lightroom, Editing",
      wants: "Social Media Marketing",
      user: "Olivia Parker",
      role: "Photographer",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: "4.7",
      reviews: 21,
      level: "Intermediate",
    },
    {
      id: 10,
      title: "Full Stack MERN Development",
      category: "Development",
      offers: "MongoDB, Express, React, Node.js",
      wants: "UI/UX Research",
      user: "Ryan Mitchell",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      rating: "4.9",
      reviews: 45,
      level: "Expert",
    },
    {
      id: 11,
      title: "Fitness Training & Nutrition",
      category: "Health & Fitness",
      offers: "Workout Plans, Strength Training, Diet Guidance",
      wants: "Mobile App Development",
      user: "Sophia Williams",
      role: "Fitness Coach",
      avatar:
        "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=200",
      rating: "4.8",
      reviews: 18,
      level: "Advanced",
    },
    {
      id: 12,
      title: "Creative Writing & Storytelling",
      category: "Writing",
      offers: "Copywriting, Blog Writing, Fiction Stories",
      wants: "Graphic Design",
      user: "Noah Carter",
      role: "Writer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: "4.6",
      reviews: 16,
      level: "Intermediate",
    },
    {
      id: 13,
      title: "Digital Illustration & Character Art",
      category: "Art & Design",
      offers: "Digital Painting, Character Design, Procreate",
      wants: "Animation Skills",
      user: "Emma Davis",
      role: "Digital Artist",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200",
      rating: "4.9",
      reviews: 29,
      level: "Advanced",
    },
    {
      id: 14,
      title: "Public Speaking & Communication",
      category: "Personal Development",
      offers: "Presentation Skills, Confidence Building, Leadership",
      wants: "Video Production",
      user: "Daniel Lee",
      role: "Communication Coach",
      avatar:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200",
      rating: "4.7",
      reviews: 23,
      level: "Expert",
    },
    {
      id: 15,
      title: "Cybersecurity & Ethical Hacking",
      category: "Cybersecurity",
      offers: "Network Security, Linux, Pen Testing",
      wants: "Cloud Computing Skills",
      user: "Aiden Scott",
      role: "Security Analyst",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: "5.0",
      reviews: 52,
      level: "Expert",
    },
  ];

  // Filter Logic
  const filteredSkills = skillCards.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.offers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wants.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen text-zinc-900">
      {/* HERO & SEARCH HEADER  */}
      <section className="bg-black text-white pt-28 pb-16 px-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/15 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-purple-300">
            <GraduationCap size={14} className="text-blue-600" />
            <span className="text-blue-600">Discover Verified Peer Swaps</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Explore Skills Ready To <span className="text-blue-600">Trade</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Browse through hundreds of skills offered by fellow creators. Match
            what you want to learn with what you can teach.
          </p>

          <div className="pt-4 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search
                size={20}
                className="absolute left-5 text-zinc-400 pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g., React, Figma, Video Editing)..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-white placeholder:text-zinc-500 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-2xl backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="bg-white border-b border-zinc-200 py-6 px-6 sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0 pr-2">
            <Filter size={14} /> Category:
          </span>
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat.name)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SKILLS GRID */}
      <section className="bg-zinc-50/50 py-16 px-6 min-h-[500px]">
        <div className="max-w-7xl mx-auto">
          {filteredSkills.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 shadow-sm">
              <p className="text-zinc-500 font-medium text-lg">
                No skill matches found for "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredSkills.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl border border-zinc-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.avatar}
                            alt={item.user}
                            className="w-10 h-10 rounded-full object-cover border border-zinc-200"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <h4 className="text-sm font-bold text-zinc-950">
                                {item.user}
                              </h4>
                              <CheckCircle2
                                size={14}
                                className="text-blue-600"
                              />
                            </div>
                            <p className="text-[11px] text-zinc-500 font-medium">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200 uppercase">
                          {item.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-950 group-hover:text-blue-600 transition-colors mb-4">
                        {item.title}
                      </h3>

                      <div className="space-y-2.5 bg-zinc-50/80 p-3.5 rounded-2xl border border-zinc-100 mb-5">
                        <div className="flex items-start gap-2 text-xs">
                          <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                            Offers:
                          </span>
                          <span className="text-zinc-700 font-medium">
                            {item.offers}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md shrink-0">
                            Wants:
                          </span>
                          <span className="text-zinc-700 font-medium">
                            {item.wants}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span>{item.rating}</span>
                        <span className="text-zinc-400 font-normal">
                          ({item.reviews})
                        </span>
                      </div>

                      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-blue-600 font-semibold text-xs transition-colors duration-200">
                        <span>Initiate Swap</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-black text-white py-20 px-6 border-t border-zinc-800 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Can't find the skill you want to trade?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Create your custom profile listing today and let matching peers find
            you directly.
          </p>
          <div className="pt-2">
            <button className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30">
              List Your Skill Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
