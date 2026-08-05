const express = require('express');
const router  = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { getDashboardOverview } = require('../controllers/dashboardController');

// GET /api/dashboard/overview
router.get('/overview', protect, getDashboardOverview);

module.exports = router;
