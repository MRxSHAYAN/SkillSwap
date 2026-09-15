const express = require('express');
const router  = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { getExploreSkills, getPublicSkills } = require('../controllers/skillsController');

// GET /api/skills/public — no auth required (for public ExploreSkills page)
router.get('/public', getPublicSkills);

// GET /api/skills — protected (dashboard explore, excludes own listings)
router.get('/', protect, getExploreSkills);

module.exports = router;
