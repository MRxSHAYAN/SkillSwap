const User = require('../models/User');

/**
 * Helper to get a user's offered skills with schema fallbacks
 */
const getOfferedSkills = (user) => {
  if (Array.isArray(user.skillsOffered) && user.skillsOffered.length > 0) {
    return user.skillsOffered;
  }
  if (Array.isArray(user.skillsTeach) && user.skillsTeach.length > 0) {
    return user.skillsTeach;
  }
  return [];
};

/**
 * Helper to get a user's wanted skills with schema fallbacks
 */
const getWantedSkills = (user) => {
  if (Array.isArray(user.skillsWanted) && user.skillsWanted.length > 0) {
    return user.skillsWanted;
  }
  if (Array.isArray(user.skillsLearn) && user.skillsLearn.length > 0) {
    return user.skillsLearn;
  }
  return [];
};

/**
 * @desc    Get AI match suggestions based on current user's offered and wanted skills
 * @route   GET /api/matches/ai-suggestions
 * @access  Private (requires valid JWT via protect middleware)
 */
const getAiSuggestions = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    // Fetch fresh profile of the current user
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
      });
    }

    const myOffered = getOfferedSkills(currentUser);
    const myWanted = getWantedSkills(currentUser);

    // Fetch all other registered users (excluding current user)
    const otherUsers = await User.find({ _id: { $ne: currentUserId } }).select(
      'fullName username avatarUrl bio role skillsTeach skillsOffered skillsWanted skillsLearn country'
    );

    const matches = otherUsers.map((targetUser) => {
      const targetOffered = getOfferedSkills(targetUser);
      const targetWanted = getWantedSkills(targetUser);

      // Normalize skill strings for matching comparison
      const normalize = (s) => (s ? String(s).trim().toLowerCase() : '');

      const myOfferedNorm = myOffered.map(normalize);
      const myWantedNorm = myWanted.map(normalize);
      const targetOfferedNorm = targetOffered.map(normalize);
      const targetWantedNorm = targetWanted.map(normalize);

      // Find overlap:
      // 1) Skills current user offers that target user wants
      const userOffersTargetWants = myOffered.filter((skill) =>
        targetWantedNorm.includes(normalize(skill))
      );

      // 2) Skills target user offers that current user wants
      const targetOffersUserWants = targetOffered.filter((skill) =>
        myWantedNorm.includes(normalize(skill))
      );

      let scoreNumber = 75;
      let reason = 'Recommended based on complementary profile and community activity.';

      const hasMutualMatch =
        userOffersTargetWants.length > 0 && targetOffersUserWants.length > 0;
      const hasSingleOverlap =
        userOffersTargetWants.length > 0 || targetOffersUserWants.length > 0;

      if (hasMutualMatch) {
        // Mutual match (high score: 90% - 98%)
        scoreNumber = Math.min(98, 90 + (userOffersTargetWants.length + targetOffersUserWants.length) * 3);
        const wantedSkillName = userOffersTargetWants[0];
        const offeredSkillName = targetOffersUserWants[0];
        reason = `They want ${wantedSkillName} & offer ${offeredSkillName}.`;
      } else if (targetOffersUserWants.length > 0) {
        // Target offers what user wants
        scoreNumber = 85;
        reason = `They offer ${targetOffersUserWants[0]} which matches your learn wishlist.`;
      } else if (userOffersTargetWants.length > 0) {
        // Target wants what user offers
        scoreNumber = 80;
        reason = `They want ${userOffersTargetWants[0]} which you offer.`;
      }

      // Determine display role
      let displayRole = 'Skill Swapper';
      if (targetUser.role === 'admin') {
        displayRole = 'Admin / Mentor';
      } else if (targetUser.bio && targetUser.bio.trim().length > 0) {
        displayRole = targetUser.bio.length > 40 ? `${targetUser.bio.substring(0, 40)}...` : targetUser.bio;
      } else if (targetUser.country) {
        displayRole = `${targetUser.country} Member`;
      }

      // Avatar fallback
      const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(targetUser.fullName)}&background=3b82f6&color=ffffff&bold=true`;

      return {
        id: targetUser._id,
        name: targetUser.fullName,
        role: displayRole,
        avatar: targetUser.avatarUrl || defaultAvatar,
        matchScore: `${scoreNumber}% Match`,
        _scoreNumber: scoreNumber, // for sorting
        reason,
        skillsOffered: targetOffered.length > 0 ? targetOffered : ['General Skills'],
        skillsWanted: targetWanted.length > 0 ? targetWanted : ['New Skills'],
      };
    });

    // Sort by match score descending
    matches.sort((a, b) => b._scoreNumber - a._scoreNumber);

    // Remove internal sorting helper field before returning response
    const formattedMatches = matches.map(({ _scoreNumber, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      count: formattedMatches.length,
      data: formattedMatches,
    });
  } catch (error) {
    console.error('getAiSuggestions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while calculating AI match suggestions',
      error: error.message,
    });
  }
};

module.exports = { getAiSuggestions };
