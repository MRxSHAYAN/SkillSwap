const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCredits } = require('../controllers/creditController');

// GET /api/credits - Protected route to fetch current credit balance and history
router.get('/', protect, getCredits);

module.exports = router;
