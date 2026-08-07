const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAiSuggestions } = require('../controllers/matchController');

// GET /api/matches/ai-suggestions
router.get('/ai-suggestions', protect, getAiSuggestions);

module.exports = router;
