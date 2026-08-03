const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

/**
 * Generate a JWT token for a given user ID.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { fullName, email, password, country, languages, skillsTeach } = req.body;

    // Guard: email must be a non-empty string before querying
    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Parse comma-separated strings into arrays
    const languagesArray = typeof languages === 'string'
      ? languages.split(',').map((lang) => lang.trim()).filter(Boolean)
      : Array.isArray(languages) ? languages : [];

    const skillsArray = typeof skillsTeach === 'string'
      ? skillsTeach.split(',').map((skill) => skill.trim()).filter(Boolean)
      : Array.isArray(skillsTeach) ? skillsTeach : [];

    const user = await User.create({
      fullName: typeof fullName === 'string' ? fullName.trim() : fullName,
      email: cleanEmail,
      password,
      country: typeof country === 'string' ? country.trim() : country,
      languages: languagesArray,
      skillsTeach: skillsArray,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        timezone: user.timezone,
        avatarUrl: user.avatarUrl,
        country: user.country,
        languages: user.languages,
        skillsTeach: user.skillsTeach,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // Handle Mongoose duplicate key error — inspect which field actually conflicted
    if (error.code === 11000) {
      const keys = Object.keys(error.keyPattern || error.keyValue || {});
      const field = keys[0] || 'email';
      const message = field === 'email'
        ? 'An account with this email already exists'
        : `A conflict occurred on field "${field}". Please try again.`;
      return res.status(409).json({ success: false, message });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(422).json({
        success: false,
        message: messages[0],
        errors: messages,
      });
    }

    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error — please try again later',
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and explicitly select the password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        timezone: user.timezone,
        avatarUrl: user.avatarUrl,
        country: user.country,
        languages: user.languages,
        skillsTeach: user.skillsTeach,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error — please try again later',
    });
  }
};

/**
 * @desc    Request Password Reset OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration time (10 minutes)
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp = otp;
    user.resetOtpExpire = otpExpire;
    await user.save();

    // Send email / log OTP
    await sendEmail({
      to: user.email,
      subject: 'SkillSwapp - Your Password Reset OTP',
      otp,
    });

    res.status(200).json({
      success: true,
      message: 'OTP verification code sent to your email address',
    });
  } catch (error) {
    console.error('ForgotPassword error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process forgot password request. Please try again later.',
    });
  }
};

/**
 * @desc    Reset Password with OTP
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, OTP, and new password are all required',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    // Find user with resetOtp, resetOtpExpire, and password fields
    const user = await User.findOne({ email: cleanEmail }).select('+resetOtp +resetOtpExpire +password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address',
      });
    }

    if (!user.resetOtp || user.resetOtp !== cleanOtp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 6-digit OTP code. Please check and try again.',
      });
    }

    if (!user.resetOtpExpire || new Date(user.resetOtpExpire).getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'OTP code has expired. Please request a new OTP code.',
      });
    }

    // Set new password (pre-save hook will hash it with bcrypt)
    user.password = newPassword;
    // Clear OTP fields
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('ResetPassword error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password. Please try again later.',
    });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };

