const User = require('../models/User');
const CreditTransaction = require('../models/CreditTransaction');

/**
 * @desc    Get user credit balance and transaction history
 * @route   GET /api/credits
 * @access  Private (requires valid JWT)
 */
const getCredits = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('credits');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const credits = user.credits ?? 100;

    const transactions = await CreditTransaction.find({ userId })
      .sort({ createdAt: -1 })
      .select('_id type amount description partnerName createdAt');

    return res.status(200).json({
      success: true,
      credits,
      transactions,
    });
  } catch (error) {
    console.error('getCredits error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching credits balance and history',
      error: error.message,
    });
  }
};

module.exports = { getCredits };
