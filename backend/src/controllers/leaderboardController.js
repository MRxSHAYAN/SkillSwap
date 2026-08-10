const Swap = require('../models/Swap');
const User = require('../models/User');
const ReviewModel = require('../models/Review');

/**
 * @desc    Get leaderboard rankings of mentors based on hours taught, swaps completed, and ratings
 * @route   GET /api/leaderboard
 * @access  Private (requires valid JWT via protect middleware)
 */
const getLeaderboard = async (req, res) => {
  try {
    const { timeframe } = req.query;
    const rawTimeframe = (timeframe || 'weekly').toString().trim().toLowerCase();

    // Determine date threshold based on timeframe parameter
    let dateFilter = null;
    const now = new Date();

    if (rawTimeframe === 'weekly') {
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (rawTimeframe === 'monthly') {
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    // 'all time', 'all-time' or anything else -> no date filter

    // 1. Fetch completed swaps within the specified timeframe
    const swapQuery = { status: 'completed' };
    if (dateFilter) {
      swapQuery.updatedAt = { $gte: dateFilter };
    }

    const [completedSwaps, reviews, users] = await Promise.all([
      Swap.find(swapQuery),
      ReviewModel.find().select('reviewer rating'),
      User.find().select('fullName avatarUrl skillsTeach skillsOffered country bio'),
    ]);

    // Duration helper mapping
    const durationToHours = {
      '30 Mins': 0.5,
      '1 Hour': 1,
      '2 Hours': 2,
    };

    // Calculate rating stats map per user
    const userRatingMap = new Map();
    reviews.forEach((rev) => {
      if (rev.reviewer) {
        const revIdStr = rev.reviewer.toString();
        if (!userRatingMap.has(revIdStr)) {
          userRatingMap.set(revIdStr, { sum: 0, count: 0 });
        }
        const current = userRatingMap.get(revIdStr);
        current.sum += rev.rating;
        current.count += 1;
      }
    });

    const getAverageRating = (userIdStr) => {
      const stats = userRatingMap.get(userIdStr);
      if (!stats || stats.count === 0) return 5.0;
      return Number((stats.sum / stats.count).toFixed(1));
    };

    // Calculate per-user hours taught and swaps completed
    const userSwapStats = new Map();

    completedSwaps.forEach((swap) => {
      const hrs = durationToHours[swap.preferredDuration] ?? 1;

      if (swap.creator) {
        const creatorId = swap.creator.toString();
        if (!userSwapStats.has(creatorId)) {
          userSwapStats.set(creatorId, { hoursTaught: 0, swapsCompleted: 0 });
        }
        const creatorStats = userSwapStats.get(creatorId);
        creatorStats.hoursTaught += hrs;
        creatorStats.swapsCompleted += 1;
      }

      if (swap.partner) {
        const partnerId = swap.partner.toString();
        if (!userSwapStats.has(partnerId)) {
          userSwapStats.set(partnerId, { hoursTaught: 0, swapsCompleted: 0 });
        }
        const partnerStats = userSwapStats.get(partnerId);
        partnerStats.swapsCompleted += 1;
      }
    });

    // Default fallback avatars if user hasn't set one
    const defaultAvatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ];

    // Build mentor list
    const mentors = users.map((user, index) => {
      const uIdStr = user._id.toString();
      const stats = userSwapStats.get(uIdStr) || { hoursTaught: 0, swapsCompleted: 0 };
      const hoursTaught = Number(stats.hoursTaught.toFixed(1));
      const swapsCompleted = stats.swapsCompleted;
      const rating = getAverageRating(uIdStr);

      // Determine badge dynamically based on hours taught
      let badge = 'Rising Star';
      if (hoursTaught > 40) {
        badge = 'Master Mentor';
      } else if (hoursTaught > 30) {
        badge = 'Level 4 Mentor';
      } else if (hoursTaught > 20) {
        badge = 'Growth Guru';
      }

      // Determine top skill offered
      const topSkill =
        (user.skillsTeach && user.skillsTeach.length > 0 && user.skillsTeach[0]) ||
        (user.skillsOffered && user.skillsOffered.length > 0 && user.skillsOffered[0]) ||
        'Skill Swap';

      const title = user.skillsTeach?.[0]
        ? `${user.skillsTeach[0]} Specialist`
        : 'Skill Mentor';

      const avatar =
        user.avatarUrl || defaultAvatars[index % defaultAvatars.length];

      return {
        id: uIdStr,
        name: user.fullName || 'Community Member',
        title,
        avatar,
        hoursTaught,
        swapsCompleted,
        rating,
        badge,
        topSkill,
      };
    });

    // Sort mentors descending based on hoursTaught (primary) and rating (secondary)
    mentors.sort((a, b) => {
      if (b.hoursTaught !== a.hoursTaught) {
        return b.hoursTaught - a.hoursTaught;
      }
      return b.rating - a.rating;
    });

    // Assign rank (1, 2, 3, ...)
    const rankedMentors = mentors.map((m, idx) => ({
      rank: idx + 1,
      ...m,
    }));

    return res.status(200).json({
      success: true,
      timeframe: rawTimeframe,
      count: rankedMentors.length,
      data: rankedMentors,
    });
  } catch (error) {
    console.error('getLeaderboard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard statistics',
      error: error.message,
    });
  }
};

module.exports = { getLeaderboard };
