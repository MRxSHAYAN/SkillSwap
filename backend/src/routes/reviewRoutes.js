const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewsGivenByUser,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const {
  createReviewValidation,
  updateReviewValidation,
} = require('../middleware/validators');

// Public routes
router.get('/', getAllReviews);
router.get('/given/:userId', getReviewsGivenByUser);
router.get('/:id', getReviewById);

// Protected routes (Requires Bearer Token)
router.post('/', protect, createReviewValidation, createReview);
router.put('/:id', protect, updateReviewValidation, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
