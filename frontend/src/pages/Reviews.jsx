import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquareQuote,
  Sparkles,
  ArrowRight,
  Filter,
  Send,
} from "lucide-react";

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Feedback Form State
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Hash Router
  const { hash } = useLocation();
  // Scroll to the element when hash exists
  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.replace("#", ""));
      if (targetElement) {
        // Small timeout allows the DOM/React elements to render fully first
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  // Sample Reviews Data
  const reviews = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Full-Stack Developer",
      avatar: "AR",
      rating: 5,
      date: "2 days ago",
      category: "Developers",
      title: "Exchanged React skills for UI Design coaching!",
      content:
        "SkillSwap made it so simple to find a dedicated UI designer. Within a week, we had set up a weekly session exchange. No money spent, pure skill sharing!",
      verified: true,
      helpfulCount: 24,
    },
    {
      id: 2,
      name: "Sophia Chen",
      role: "Marketing Strategist",
      avatar: "SC",
      rating: 5,
      date: "1 week ago",
      category: "Professionals",
      title: "The mentor verification gives huge peace of mind.",
      content:
        "I was skeptical about peer bartering at first, but every partner I've matched with here has been professional, punctual, and highly skilled in their domain.",
      verified: true,
      helpfulCount: 18,
    },
    {
      id: 3,
      name: "Marcus Vance",
      role: "Language Enthusiast",
      avatar: "MV",
      rating: 5,
      date: "2 weeks ago",
      category: "Students",
      title: "Fluent in conversational Spanish in 3 months!",
      content:
        "Swapped Python basics for Spanish conversation practice. The platform's scheduling and chat interface made keeping track of sessions effortless.",
      verified: true,
      helpfulCount: 31,
    },
    {
      id: 4,
      name: "Elena Rostova",
      role: "Graphic Designer",
      avatar: "ER",
      rating: 4,
      date: "3 weeks ago",
      category: "Professionals",
      title: "Fantastic community and genuine people.",
      content:
        "Great experience overall. The search filters allowed me to find mentors tailored specifically to my timezone and language preferences.",
      verified: true,
      helpfulCount: 12,
    },
  ];

  const categories = ["All", "Professionals", "Developers", "Students"];

  const filteredReviews =
    selectedFilter === "All"
      ? reviews
      : reviews.filter((review) => review.category === selectedFilter);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", { rating, category, message });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* RATING SUMMARY */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-semibold tracking-wide text-blue-700 mb-4">
            <Sparkles size={14} className="text-blue-600" />
            CLIENT TRUST & TESTIMONIALS
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            See how real peers are swapping skills.
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-2">
            Discover honest feedback from thousands of creators, developers, and learners sharing expertise worldwide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-extrabold text-slate-900">4.9 / 5.0</div>
              <div className="flex items-center gap-1 my-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-slate-500">Overall Rating</span>
            </div>

            <div className="flex flex-col items-center sm:border-x border-slate-100 px-4">
              <div className="text-3xl font-extrabold text-slate-900">12,500+</div>
              <span className="text-xs font-semibold text-blue-600 mt-1">Swaps Completed</span>
              <span className="text-xs text-slate-500">Across 80+ countries</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl font-extrabold text-slate-900">98%</div>
              <span className="text-xs font-semibold text-emerald-600 mt-1">Satisfaction Rate</span>
              <span className="text-xs text-slate-500">Verified peer reviews</span>
            </div>
          </div>
        </div>

        {/*  REVIEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <CheckCircle2
                            size={15}
                            className="text-emerald-500 fill-emerald-50"
                          />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{review.role}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 shrink-0">
                    {review.date}
                  </span>
                </div>

                <div className="flex items-center gap-1 my-3 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <h5 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  "{review.title}"
                </h5>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {review.content}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
                  {review.category}
                </span>

                <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors cursor-pointer">
                  <ThumbsUp size={13} />
                  <span className="text-[11px]">Helpful ({review.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>


        {/*  FEEDBACK FORM  */}
        <div id="feedback-form" className="w-full  mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-slate-800">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Thank you for your feedback!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We review every submission to help improve SkillSwap for our community.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-5">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Share Your Experience
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have suggestions or feedback? Let us know how we can make the platform better.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={
                          (hoverRating || rating) >= star
                            ? "text-amber-400 fill-amber-400"
                            : ""
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {["General", "Bug Report", "Feature Idea", "Community"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        category === item
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Feedback
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you loved or what we can improve..."
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Send Feedback</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}