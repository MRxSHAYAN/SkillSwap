const User = require('../models/User');

/**
 * @desc    Get the currently authenticated user's profile
 * @route   GET /api/user/settings/me
 * @access  Private (requires valid JWT via protect middleware)
 */
const getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware — always the authenticated user.
    // We re-fetch to guarantee fresh data and control exactly which fields are returned.
    const user = await User.findById(req.user._id).select(
      'fullName username email bio timezone avatarUrl country languages skillsTeach notificationPrefs swapPrefs role createdAt'
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Update the currently authenticated user's profile
 * @route   PUT /api/user/settings/me
 * @access  Private — user can ONLY update their OWN profile (req.user._id, not from params)
 *
 * Security: We NEVER trust an ID from the request body or URL params.
 * The target user is always derived from the verified JWT via req.user._id.
 * This prevents IDOR — User A cannot modify User B's profile.
 */
const updateMe = async (req, res) => {
  try {
    // Pull only the fields we allow the user to change.
    // Explicitly exclude sensitive fields (password, role, email can be changed
    // but triggers uniqueness check below).
    const { fullName, username, email, bio, timezone } = req.body;

    // Build update object — only include defined fields so partial updates work.
    const updateFields = {};
    if (fullName  !== undefined) updateFields.fullName  = fullName.trim();
    // Store empty username as null so the sparse unique index works correctly
    if (username  !== undefined) updateFields.username  = username.trim() || null;
    if (bio       !== undefined) updateFields.bio       = bio.trim() || null;
    if (timezone  !== undefined) updateFields.timezone  = timezone.trim() || null;
    if (email     !== undefined) updateFields.email     = email.trim().toLowerCase();

    // If a new avatar was uploaded, convert the buffer to a base64 data URL.
    // This is a simple approach that works without an external storage service.
    // For production, replace this with an S3 / Cloudinary upload and store the URL.
    if (req.file) {
      const base64 = req.file.buffer.toString('base64');
      updateFields.avatarUrl = `data:${req.file.mimetype};base64,${base64}`;
    }

    // If email is being changed, ensure it's not already taken by another user.
    if (updateFields.email && updateFields.email !== req.user.email) {
      const emailTaken = await User.findOne({ email: updateFields.email });
      if (emailTaken) {
        return res.status(409).json({
          success: false,
          message: 'This email is already in use by another account',
        });
      }
    }

    // If username is being changed, ensure uniqueness (skip if clearing to null).
    if (updateFields.username && updateFields.username !== req.user.username) {
      const usernameTaken = await User.findOne({ username: updateFields.username });
      if (usernameTaken) {
        return res.status(409).json({
          success: false,
          message: 'This username is already taken',
        });
      }
    }

    // Update using req.user._id — never a client-supplied ID.
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      {
        new: true,            // return the updated document
        runValidators: true,  // run schema validations on the new values
      }
    ).select(
      'fullName username email bio timezone avatarUrl country languages skillsTeach notificationPrefs swapPrefs role createdAt'
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    // Mongoose validation errors (e.g. field too long)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(422).json({ success: false, message: messages[0], errors: messages });
    }

    // Multer file size error
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ success: false, message: 'Image must be under 2MB' });
    }

    console.error('updateMe error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Change the authenticated user's password
 * @route   PUT /api/user/settings/me/password
 * @access  Private
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Both currentPassword and newPassword are required' });
    }

    if (newPassword.length < 6) {
      return res.status(422).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    // Re-fetch with password field (select: false by default)
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('changePassword error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Update notification or swap preferences
 * @route   PUT /api/user/settings/me/prefs
 * @access  Private
 */
const updatePrefs = async (req, res) => {
  try {
    const { notificationPrefs, swapPrefs } = req.body;

    const updateFields = {};

    if (notificationPrefs && typeof notificationPrefs === 'object') {
      // Only allow known boolean keys — ignore anything else
      const allowed = ['emailSwaps', 'emailMessages', 'emailReminders', 'marketingUpdates'];
      allowed.forEach((key) => {
        if (typeof notificationPrefs[key] === 'boolean') {
          updateFields[`notificationPrefs.${key}`] = notificationPrefs[key];
        }
      });
    }

    if (swapPrefs && typeof swapPrefs === 'object') {
      if (typeof swapPrefs.acceptProposals === 'boolean') {
        updateFields['swapPrefs.acceptProposals'] = swapPrefs.acceptProposals;
      }
      if (swapPrefs.meetingLink !== undefined) {
        // Basic URL sanity — allow empty string to clear the link
        const link = swapPrefs.meetingLink.trim();
        if (link && !/^https?:\/\/.+/.test(link)) {
          return res.status(422).json({ success: false, message: 'Meeting link must be a valid URL starting with http:// or https://' });
        }
        updateFields['swapPrefs.meetingLink'] = link;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    ).select('notificationPrefs swapPrefs');

    res.status(200).json({
      success: true,
      message: 'Preferences saved',
      notificationPrefs: updatedUser.notificationPrefs,
      swapPrefs:         updatedUser.swapPrefs,
    });
  } catch (error) {
    console.error('updatePrefs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * @desc    Permanently delete the authenticated user's account
 * @route   DELETE /api/user/settings/me
 * @access  Private
 */
const deleteMe = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Please confirm with your password to delete your account' });
    }

    // Re-fetch with password field
    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password is incorrect' });
    }

    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('deleteMe error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getMe, updateMe, changePassword, updatePrefs, deleteMe };
