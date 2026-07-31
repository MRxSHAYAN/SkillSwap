const NewsletterSubscriber = require('../models/NewsletterSubscriber');

/**
 * @desc    Subscribe email to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to the newsletter!',
      });
    }

    const subscriber = new NewsletterSubscriber({ email: cleanEmail });
    await subscriber.save();

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to SkillSwap newsletter!',
      data: subscriber,
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while subscribing to newsletter',
      error: error.message,
    });
  }
};

module.exports = { subscribeNewsletter };
