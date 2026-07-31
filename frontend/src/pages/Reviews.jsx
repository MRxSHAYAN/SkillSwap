import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  UserCheck,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

// Demo reviews stored on the frontend (not in database)
const DEMO_REVIEWS = [
  {
    _id: "demo-review-1",
    reviewer: { fullName: "Alex Rivera", country: "United States" },
    Review: { fullName: "Muhammad Shayan" },
    skill: "React & Tailwind CSS",
    rating: 5,
    comment: "Exchanged React skills for UI Design coaching! Shayan is a clear, thorough mentor who broke down complex hooks quickly. Awesome experience!",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    isDemo: true,
  },
  {
    _id: "demo-review-2",
    reviewer: { fullName: "Sophia Chen", country: "Canada" },
    Review: { fullName: "Elena Rostova" },
    skill: "Conversational Spanish",
    rating: 5,
    comment: "Swapped Python basics for Spanish practice. The platform made scheduling and session exchanges completely effortless!",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    isDemo: true,
  },
  {
    _id: "demo-review-3",
    reviewer: { fullName: "Marcus Vance", country: "Germany" },
    Review: { fullName: "Alex Rivera" },
    skill: "Node.js & Express",
    rating: 4,
    comment: "Great peer mentor. Helped me structure REST APIs cleanly in exchange for Docker containerization setup.",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    isDemo: true,
  },
];

export default function ReviewsPage() {
  const navigate = useNavigate();
  const { hash } = useLocation();

  // API Data State (Initializes with Demo Reviews as default)
  const [reviews, setReviews] = useState(DEMO_REVIEWS);
  const [summary, setSummary] = useState({
    totalReviews: DEMO_REVIEWS.length,
    averageRating: 4.7,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Category Filter State
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Feedback Form State
  const [Review, setReview] = useState("");
  const [skill, setSkill] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Auth Context
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // Scroll to hash section
  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.replace("#", ""));
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hash]);

  // Fetch reviews from backend API & merge with demo reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();

      if (res.ok && data.success) {
        const fetchedDbReviews = data.data || [];
        // Combine DB reviews with demo reviews (DB reviews appear first)
        const combinedReviews = [...fetchedDbReviews, ...DEMO_REVIEWS];
        setReviews(combinedReviews);

        // Recalculate summary stats
        const total = combinedReviews.length;
        const sum = combinedReviews.reduce((acc, r) => acc + (r.rating || 5), 0);
        const avg = Number((sum / total).toFixed(1));

        setSummary({
          totalReviews: total,
          averageRating: avg,
        });
      } else {
        // Fallback to demo reviews if API returns error
        setReviews(DEMO_REVIEWS);
      }
    } catch (err) {
      console.log("Backend offline or empty, rendering demo reviews fallback");
      setReviews(DEMO_REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Filter logic based on rating selection
  const categories = ["All", "5 Stars", "4 Stars & Up"];
  const filteredReviews = reviews.filter((review) => {
    if (selectedFilter === "5 Stars") return review.rating === 5;
    if (selectedFilter === "4 Stars & Up") return review.rating >= 4;
    return true;
  });

  // Handle Review Submission to backend API
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!token) {
      setFormError("You must be logged in to leave a review.");
      return;
    }

    if (!Review || Review.trim() === "") {
      setFormError("Please enter a valid User ID to review.");
      return;
    }

    if (!skill || skill.trim() === "") {
      setFormError("Please specify the skill exchanged.");
      return;
    }

    if (comment.trim().length < 5) {
      setFormError("Comment must be at least 5 characters long.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Review: Review.trim(),
          skill: skill.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          setFormError(data.errors[0].message);
        } else {
          setFormError(data.message || "Failed to submit review.");
        }
        return;
      }

      setSubmitted(true);
      setComment("");
      setReview("");
      setSkill("");
      setRating(5);
      // Refresh live reviews list from database
      fetchReviews();
    } catch (err) {
      console.error("Submission error:", err);
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-20 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* RATING SUMMARY */}
        <div className="rounded-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-semibold tracking-wide text-blue-700 mb-4">
            <Sparkles size={14} className="text-blue-600" />
            COMMUNITY REVIEWS & RATINGS
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            See how real peers are swapping skills.
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-2">
            Discover honest feedback from creators, developers, and learners sharing expertise worldwide.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-extrabold text-slate-900">
                {summary.averageRating} / 5.0
              </div>
              <div className="flex items-center gap-1 my-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-slate-500">Overall Rating</span>
            </div>

            <div className="flex flex-col items-center sm:border-x border-slate-100 px-4">
              <div className="text-3xl font-extrabold text-slate-900">
                {summary.totalReviews}
              </div>
              <span className="text-xs font-semibold text-blue-600 mt-1">Total Reviews</span>
              <span className="text-xs text-slate-500">Peer ratings</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl font-extrabold text-slate-900">100%</div>
              <span className="text-xs font-semibold text-emerald-600 mt-1">Satisfaction Rate</span>
              <span className="text-xs text-slate-500">Verified peer swaps</span>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <span className="text-xs font-bold text-slate-700">Filter Reviews:</span>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* REVIEWS GRID */}
        {loading ? (
          <div className="text-center py-12 space-y-3">
            <Loader2 size={32} className="animate-spin text-blue-600 mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-sm">
            <Sparkles size={32} className="text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No reviews match this filter</h3>
            <p className="text-xs text-slate-500 mt-1">Try switching your filter to "All" to view reviews.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review) => {
              const reviewerName = review.reviewer?.fullName || "Anonymous Peer";
              const reviewerCountry = review.reviewer?.country || "Global";
              const ReviewName = review.Review?.fullName || "Peer Mentor";
              const initials = reviewerName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={review._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-slate-900">
                              {reviewerName}
                            </h4>
                            <CheckCircle2
                              size={15}
                              className="text-emerald-500 fill-emerald-50"
                            />
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {reviewerCountry} • Reviewed {ReviewName}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        {review.isDemo && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-semibold text-indigo-600 flex items-center gap-1">
                            <BadgeCheck size={11} /> Demo Review
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 my-3 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                      <BookOpen size={12} />
                      <span>Skill: {review.skill}</span>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-1">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="text-[11px] text-slate-400">Verified Skill Exchange</span>

                    <div className="flex items-center gap-1 text-slate-400">
                      <ThumbsUp size={13} />
                      <span className="text-[11px]">Helpful</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FEEDBACK FORM */}
        <div id="feedback-form" className="w-full mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm text-slate-800">
          {!token ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <UserCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Log In to Write a Review
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Only authenticated SkillSwap members can post peer reviews to ensure high quality and genuine feedback.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 cursor-pointer"
              >
                Go to Sign In
              </button>
            </div>
          ) : submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Thank you! Your review has been saved.
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Your feedback has been recorded in MongoDB and is now visible to the community.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-5">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  Submit a Peer Review
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Posting as <strong className="text-slate-800">{currentUser?.fullName || "Logged-in User"}</strong>
                </p>
              </div>

              {formError && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Review User Name
                  </label>
                  <input
                   type="text"
                   value={Review}
                   onChange={(e) => setReview(e.target.value)}
                   placeholder="e.g. Alex Rivera or John Doe"
                   required
                   className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                   ></input>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Skill Exchanged
                  </label>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="e.g. React.js, Spanish, UI Design"
                    required
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Rating (1 to 5 Stars)
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
                  <span className="ml-2 text-xs font-bold text-slate-700">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Review / Feedback
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your skill swap session..."
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Review to Backend</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}