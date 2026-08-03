const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

module.exports = { register, login };
