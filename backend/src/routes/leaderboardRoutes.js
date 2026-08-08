const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getLeaderboard } = require('../controllers/leaderboardController');

// GET /api/leaderboard - Protected route to fetch leaderboard rankings
router.get('/', protect, getLeaderboard);

module.exports = router;
