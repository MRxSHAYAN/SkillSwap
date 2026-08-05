const Swap = require('../models/Swap');
const User = require('../models/User');
const ReviewModel = require('../models/Review');

/**
 * @desc    Get all available skill listings / mentors offered across the platform
 *          Excludes listings owned by the logged-in user.
 * @route   GET /api/skills
 * @access  Private
 */
const getExploreSkills = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // 1. Fetch all open swap offers created by OTHER users
    const openSwaps = await Swap.find({
      creator: { $ne: currentUserId },
      status: 'open',
    })
      .populate('creator', 'fullName avatarUrl country skillsTeach bio')
      .sort({ createdAt: -1 });

    // 2. Fetch all reviews to compute mentor average ratings
    const reviews = await ReviewModel.find().select('reviewer rating');

    // Helper: calculate average rating & review count for a user
    const getRatingStats = (userIdStr) => {
      const userReviews = reviews.filter(
        (r) => r.reviewer && r.reviewer.toString() === userIdStr
      );
      if (userReviews.length === 0) {
        return { rating: 5.0, reviewCount: 0 };
      }
      const sum = userReviews.reduce((acc, r) => acc + r.rating, 0);
      return {
        rating: Number((sum / userReviews.length).toFixed(1)),
        reviewCount: userReviews.length,
      };
    };

    // 3. Format open swap offers into skill listing cards
    const listings = openSwaps.map((swap) => {
      const creator = swap.creator;
      const stats = creator ? getRatingStats(creator._id.toString()) : { rating: 5.0, reviewCount: 0 };

      return {
        id: swap._id,
        swapId: swap._id,
        mentorId: creator?._id || null,
        name: creator?.fullName || 'Community Member',
        role: creator?.skillsTeach?.[0] ? `${creator.skillsTeach[0]} Mentor` : 'Skill Mentor',
        avatarUrl: creator?.avatarUrl || null,
        country: creator?.country || '',
        rating: stats.rating,
        reviewsCount: stats.reviewCount,
        category: swap.category || 'Other',
        offering: [swap.offeredSkill],
        seeking: [swap.wantedSkill],
        description: swap.description || '',
        skillLevel: swap.skillLevel || 'Intermediate',
        preferredDuration: swap.preferredDuration || '1 Hour',
        availability: swap.availability || 'Flexible',
        totalHours: '10h taught',
      };
    });

    // 4. Also fetch users with `skillsTeach` who don't have an open Swap object yet,
    // so new registered users also show up in Explore Skills!
    const usersWithSkills = await User.find({
      _id: { $ne: currentUserId },
    }).select('fullName avatarUrl country skillsTeach bio');

    // Check which users are already represented in open swaps
    const coveredUserIds = new Set(openSwaps.map((s) => s.creator?._id?.toString()));

    usersWithSkills.forEach((u) => {
      if (!coveredUserIds.has(u._id.toString()) && u.skillsTeach && u.skillsTeach.length > 0) {
        const stats = getRatingStats(u._id.toString());
        listings.push({
          id: `user-${u._id}`,
          swapId: null,
          mentorId: u._id,
          name: u.fullName,
          role: u.skillsTeach[0] ? `${u.skillsTeach[0]} Mentor` : 'Skill Mentor',
          avatarUrl: u.avatarUrl || null,
          country: u.country || '',
          rating: stats.rating,
          reviewsCount: stats.reviewCount,
          category: 'Development',
          offering: u.skillsTeach,
          seeking: ['General Learning'],
          description: u.bio || 'Available for skill exchange sessions.',
          skillLevel: 'Intermediate',
          preferredDuration: '1 Hour',
          availability: 'Flexible',
          totalHours: '5h taught',
        });
      }
    });

    return res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    console.error('getExploreSkills error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching available skills',
      error: error.message,
    });
  }
};

module.exports = { getExploreSkills };
