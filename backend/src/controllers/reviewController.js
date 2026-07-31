const ReviewModel = require('../models/Review');
const User = require('../models/User');

/**
 * @desc    Create a new review
 * @route   POST /api/reviews
 * @access  Private (Requires Authentication)
 */
const createReview = async (req, res) => {
  try {
    const { revieweeName, skill, rating, comment } = req.body;
    const reviewerId = req.user._id;

    // Create and save review
    const review = new ReviewModel({
      reviewer: reviewerId,
      revieweeName: revieweeName ? revieweeName.trim() : '',
      skill: skill.trim(),
      rating,
      comment,
    });

    await review.save();

    // Populate reviewer info for response
    await review.populate('reviewer', 'fullName email country skillsTeach');

    return res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    console.error('Error creating review:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this person for this skill',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating review',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all reviews across the platform
 * @route   GET /api/reviews
 * @access  Public
 */
const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate('reviewer', 'fullName country skillsTeach')
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;
    let averageRating = 0;

    if (totalReviews > 0) {
      const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      averageRating = Number((sum / totalReviews).toFixed(1));
    }

    return res.status(200).json({
      success: true,
      message: 'All reviews retrieved successfully',
      summary: {
        totalReviews,
        averageRating,
      },
      data: reviews,
    });
  } catch (error) {
    console.error('Error getting all reviews:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all reviews written BY a specific user (reviewer)
 * @route   GET /api/reviews/given/:userId
 * @access  Public
 */
const getReviewsGivenByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const reviews = await ReviewModel.find({ reviewer: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      message: 'Reviews given by user retrieved successfully',
      data: reviews,
    });
  } catch (error) {
    console.error('Error getting reviews given by user:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid User ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews',
      error: error.message,
    });
  }
};

/**
 * @desc    Get a single review by ID
 * @route   GET /api/reviews/:id
 * @access  Public
 */
const getReviewById = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id)
      .populate('reviewer', 'fullName country skillsTeach');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('Error getting review by ID:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching review',
      error: error.message,
    });
  }
};

/**
 * @desc    Update a review
 * @route   PUT /api/reviews/:id
 * @access  Private (Owner only)
 */
const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Only the author can update their review
    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review',
      });
    }

    const { rating, comment, skill } = req.body;

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (skill !== undefined) review.skill = skill;

    await review.save();
    await review.populate('reviewer', 'fullName country');

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while updating review',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a review
 * @route   DELETE /api/reviews/:id
 * @access  Private (Owner or Admin)
 */
const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    const isOwner = review.reviewer.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    await ReviewModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting review',
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsGivenByUser,
  getReviewById,
  updateReview,
  deleteReview,
};
