const express = require('express');
const router  = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  createSwap,
  getMySwaps,
  getMyRequests,
  updateSwapStatus,
  completeSwap,
  proposeSwap,
} = require('../controllers/swapController');

// POST /api/swaps/propose
router.post('/propose', protect, proposeSwap);

// POST /api/swaps/create
router.post('/create', protect, createSwap);

// GET /api/swaps/mine
router.get('/mine', protect, getMySwaps);

// GET /api/swaps/my-requests
router.get('/my-requests', protect, getMyRequests);

// PATCH /api/swaps/:id/status
router.patch('/:id/status', protect, updateSwapStatus);

// PATCH /api/swaps/:id/complete
router.patch('/:id/complete', protect, completeSwap);

module.exports = router;
