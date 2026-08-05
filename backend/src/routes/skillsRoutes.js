const express = require('express');
const router  = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { getExploreSkills } = require('../controllers/skillsController');

// GET /api/skills
router.get('/', protect, getExploreSkills);

module.exports = router;
