const ContactMessage = require('../models/ContactMessage');

/**
 * @desc    Submit a contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message fields are all required',
      });
    }

    const contactMsg = new ContactMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    await contactMsg.save();

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received.',
      data: contactMsg,
    });
  } catch (error) {
    console.error('Error submitting contact message:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending contact message',
      error: error.message,
    });
  }
};

module.exports = { submitContactMessage };
