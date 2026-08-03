const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require('../middleware/validators');

// POST /api/auth/register
router.post('/register', registerValidation, register);

// POST /api/auth/login
router.post('/login', loginValidation, login);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

// POST /api/auth/reset-password
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;

