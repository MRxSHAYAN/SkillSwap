const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const { getMe, updateMe, changePassword, updatePrefs, deleteMe } = require('../controllers/userController');

// All routes below require a valid JWT.
router.use(protect);

// GET  /api/user/settings/me  — fetch own profile
router.get('/settings/me', getMe);

// PUT  /api/user/settings/me  — update own profile (multipart/form-data, optional avatar)
// upload.single('avatar') runs before updateMe; req.file is undefined if no file was sent.
router.put(
  '/settings/me',
  (req, res, next) => {
    // Wrap multer so we can return a clean JSON error on file violations
    upload.single('avatar')(req, res, (err) => {
      if (err) {
        const msg =
          err.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be under 2MB'
            : err.message || 'File upload error';
        return res.status(400).json({ success: false, message: msg });
      }
      next();
    });
  },
  updateMe
);

// PUT  /api/user/settings/me/password  — change password
router.put('/settings/me/password', changePassword);

// PUT  /api/user/settings/me/prefs  — save notification + swap preferences
router.put('/settings/me/prefs', updatePrefs);

// DELETE  /api/user/settings/me  — permanently delete account (requires password confirmation)
router.delete('/settings/me', deleteMe);

module.exports = router;
