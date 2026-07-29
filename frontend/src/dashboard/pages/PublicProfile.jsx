import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  Edit3,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function PublicProfile() {
  const profile = {
    name: "Muhammad Shayan",
    title: "Full-Stack Web Developer",
    location: "Karachi, Pakistan",
    joinedDate: "January 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    bio: "Passionate about building scalable web applications with modern tech. Always looking to exchange knowledge on frontend architecture, UI design systems, and Node.js microservices.",
    stats: {
      swapsCompleted: 24,
      hoursTaught: 48,
      rating: 4.9,
      reviewsCount: 18,
    },
    teachingSkills: [
      { name: "React.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Node.js", level: "Intermediate" },
      { name: "TypeScript", level: "Intermediate" },
    ],
    learningSkills: [
      { name: "Figma UI/UX", goal: "Design Systems" },
      { name: "SEO Strategy", goal: "Growth" },
      { name: "Python", goal: "Automation" },
    ],
    reviews: [
      {
        id: 1,
        author: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 days ago",
        comment: "Shayan is a clear, thorough teacher. He broke down complex React hooks in under an hour!",
      },
      {
        id: 2,
        author: "Sophia Chen",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Awesome session! He helped me optimize my CSS layouts quickly. Highly recommend swapping with him.",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900" />
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-white shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </Link>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm shadow-blue-500/20">
                <MessageSquare size={15} />
                <span>Request Swap</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">
                {profile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold flex items-center gap-1 border border-blue-100">
                <CheckCircle2 size={13} /> Verified Mentor
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-600">{profile.title}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <MapPin size={14} className="text-slate-400" /> {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-slate-400" /> Joined {profile.joinedDate}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">{profile.stats.swapsCompleted}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Swaps Completed</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">{profile.stats.hoursTaught}h</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Hours Taught</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900 flex items-center justify-center gap-1">
            <Star size={18} className="text-amber-400 fill-amber-400" />
            {profile.stats.rating}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Mentor Rating</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm text-center">
          <p className="text-2xl font-black text-slate-900">{profile.stats.reviewsCount}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">Reviews Received</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Offered */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-600" />
            <span>Skills Can Teach</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.teachingSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 flex items-center gap-2"
              >
                {skill.name}
                <span className="text-[10px] text-blue-500 font-normal">({skill.level})</span>
              </span>
            ))}
          </div>
        </div>

        {/* Skills Want to Learn */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award size={18} className="text-purple-600" />
            <span>Skills Want to Learn</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.learningSkills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-100 flex items-center gap-2"
              >
                {skill.name}
                <span className="text-[10px] text-purple-500 font-normal">({skill.goal})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Star size={18} className="text-amber-500" />
          <span>Community Reviews ({profile.reviews.length})</span>
        </h3>

        <div className="divide-y divide-slate-100">
          {profile.reviews.map((rev) => (
            <div key={rev.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.author}</h4>
                    <p className="text-[10px] text-slate-400">{rev.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star size={14} className="fill-amber-400" />
                  <span className="text-xs font-bold text-slate-800">{rev.rating}.0</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-11">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}