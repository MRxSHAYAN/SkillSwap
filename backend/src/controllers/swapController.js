const Swap = require('../models/Swap');
const Notification = require('../models/Notification');

/**
 * Helper to create notifications asynchronously without blocking the response
 */
const createNotificationAsync = async ({ recipient, sender, type, message, link }) => {
  try {
    if (!recipient || !sender || recipient.toString() === sender.toString()) {
      return; // Do not notify yourself
    }

    await Notification.create({
      recipient,
      sender,
      type,
      message,
      read: false,
      link: link || '/dashboard/my-swaps',
    });
  } catch (err) {
    console.error('Failed to create notification:', err.message);
  }
};

/**
 * @desc    Create a new swap offer/proposal
 * @route   POST /api/swaps/create
 * @access  Private (requires valid JWT)
 */
const createSwap = async (req, res) => {
  try {
    const {
      offeredSkill,
      wantedSkill,
      category,
      description,
      skillLevel,
      preferredDuration,
      availability,
      partner, // optional partner ID if proposing to a specific user
    } = req.body;

    // ── Validate required fields ────────────────────────────────────────────
    if (!offeredSkill || !offeredSkill.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Offered skill is required',
      });
    }

    if (!wantedSkill || !wantedSkill.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Wanted skill is required',
      });
    }

    // Determine status & recipient
    const recipientId = partner || null;
    const initialStatus = recipientId ? 'pending' : 'open';

    // ── Build the swap document ─────────────────────────────────────────────
    const swapData = {
      creator:           req.user._id,
      partner:           recipientId,
      offeredSkill:      offeredSkill.trim(),
      wantedSkill:       wantedSkill.trim(),
      category:          category          || 'Other',
      description:       description?.trim() || '',
      skillLevel:        skillLevel         || 'Intermediate',
      preferredDuration: preferredDuration  || '1 Hour',
      availability:      availability       || 'Flexible',
      status:            initialStatus,
    };

    const swap = new Swap(swapData);
    await swap.save();

    // Populate creator and partner info for the response
    await swap.populate('creator', 'fullName avatarUrl skillsTeach email');
    if (swap.partner) {
      await swap.populate('partner', 'fullName avatarUrl skillsTeach email');

      // ── TRIGGER NOTIFICATION: Send SWAP_REQUEST to Partner ──────────────
      const senderName = req.user.fullName || 'A member';
      createNotificationAsync({
        recipient: recipientId,
        sender:    req.user._id,
        type:      'SWAP_REQUEST',
        message:   `${senderName} sent you a skill swap proposal: ${offeredSkill.trim()} ↔ ${wantedSkill.trim()}`,
        link:      '/dashboard/my-swaps',
      });
    }

    return res.status(201).json({
      success: true,
      message: recipientId ? 'Proposal sent successfully!' : 'Swap offer created successfully',
      data:    swap,
    });
  } catch (error) {
    console.error('createSwap error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(422).json({
        success: false,
        message: messages[0],
        errors:  messages,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating swap',
      error:   error.message,
    });
  }
};

/**
 * @desc    Get all swaps for the logged-in user (as creator or partner)
 * @route   GET /api/swaps/mine
 * @access  Private
 */
const getMySwaps = async (req, res) => {
  try {
    const userId = req.user._id;

    const swaps = await Swap.find({
      $or: [{ creator: userId }, { partner: userId }],
    })
      .populate('creator', 'fullName avatarUrl skillsTeach email')
      .populate('partner',  'fullName avatarUrl skillsTeach email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count:   swaps.length,
      data:    swaps,
    });
  } catch (error) {
    console.error('getMySwaps error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching swaps',
      error:   error.message,
    });
  }
};

/**
 * @desc    Get swap requests involving the logged-in user, split into received & sent
 * @route   GET /api/swaps/my-requests
 * @access  Private
 */
const getMyRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const [receivedRequests, sentRequests, activeSwaps] = await Promise.all([
      // Received: Proposals sent to the logged-in user by others
      Swap.find({ partner: userId })
        .populate('creator', 'fullName avatarUrl skillsTeach email country')
        .populate('partner', 'fullName avatarUrl skillsTeach email country')
        .sort({ createdAt: -1 }),

      // Sent: Proposals created by the logged-in user sent to others (or open offers)
      Swap.find({ creator: userId })
        .populate('creator', 'fullName avatarUrl skillsTeach email country')
        .populate('partner', 'fullName avatarUrl skillsTeach email country')
        .sort({ createdAt: -1 }),

      // Active: All swaps where user is creator OR partner with status accepted/matched
      Swap.find({
        $or: [{ creator: userId }, { partner: userId }],
        status: { $in: ['accepted', 'matched'] },
      })
        .populate('creator', 'fullName avatarUrl skillsTeach email country')
        .populate('partner', 'fullName avatarUrl skillsTeach email country')
        .sort({ nextSession: 1, createdAt: -1 }),
    ]);

    return res.status(200).json({
      success: true,
      receivedRequests,
      sentRequests,
      activeSwaps,
    });
  } catch (error) {
    console.error('getMyRequests error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching swap requests',
      error:   error.message,
    });
  }
};

/**
 * @desc    Accept or decline a swap proposal
 * @route   PATCH /api/swaps/:id/status
 * @access  Private (Recipient only)
 */
const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const swapId = req.params.id;
    const userId = req.user._id;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "accepted" or "rejected"',
      });
    }

    const swap = await Swap.findById(swapId);

    if (!swap) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found',
      });
    }

    // Security check: Only the recipient (partner) can accept or decline!
    if (!swap.partner || swap.partner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the recipient of this proposal can accept or decline it',
      });
    }

    swap.status = status;

    // If accepted, schedule next session automatically if not set
    if (status === 'accepted' && !swap.nextSession) {
      const scheduledDate = new Date();
      scheduledDate.setDate(scheduledDate.getDate() + 2); // 2 days from now at 4:00 PM
      scheduledDate.setHours(16, 0, 0, 0);
      swap.nextSession = scheduledDate;
    }

    await swap.save();
    await swap.populate('creator', 'fullName avatarUrl skillsTeach email');
    await swap.populate('partner', 'fullName avatarUrl skillsTeach email');

    // ── TRIGGER NOTIFICATION: Send SWAP_ACCEPTED or SWAP_DECLINED to Creator ──
    const senderName = req.user.fullName || 'A member';
    const notifType = status === 'accepted' ? 'SWAP_ACCEPTED' : 'SWAP_DECLINED';
    const notifAction = status === 'accepted' ? 'accepted' : 'declined';

    createNotificationAsync({
      recipient: swap.creator._id,
      sender:    req.user._id,
      type:      notifType,
      message:   `${senderName} ${notifAction} your skill swap proposal: ${swap.offeredSkill} ↔ ${swap.wantedSkill}`,
      link:      '/dashboard/my-swaps',
    });

    return res.status(200).json({
      success: true,
      message: `Swap proposal ${status} successfully`,
      data: swap,
    });
  } catch (error) {
    console.error('updateSwapStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating swap status',
      error: error.message,
    });
  }
};

/**
 * @desc    Mark a swap as completed (triggers credits & review eligibility)
 * @route   PATCH /api/swaps/:id/complete
 * @access  Private (creator or partner)
 */
const completeSwap = async (req, res) => {
  try {
    const swapId = req.params.id;
    const userId = req.user._id;

    const swap = await Swap.findById(swapId);

    if (!swap) {
      return res.status(404).json({ success: false, message: 'Swap not found' });
    }

    // Only creator or partner can mark it complete
    const isParticipant =
      swap.creator.toString() === userId.toString() ||
      (swap.partner && swap.partner.toString() === userId.toString());

    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (swap.status !== 'accepted' && swap.status !== 'matched') {
      return res.status(400).json({
        success: false,
        message: 'Only active (accepted) swaps can be marked as completed',
      });
    }

    swap.status = 'completed';
    await swap.save();
    await swap.populate('creator', 'fullName avatarUrl skillsTeach email');
    await swap.populate('partner', 'fullName avatarUrl skillsTeach email');

    // Notify both participants
    const actorName = req.user.fullName || 'A member';
    const otherId = swap.creator._id.toString() === userId.toString()
      ? swap.partner?._id
      : swap.creator._id;

    if (otherId) {
      createNotificationAsync({
        recipient: otherId,
        sender:    userId,
        type:      'SWAP_ACCEPTED',
        message:   `${actorName} marked your skill swap as completed. You can now submit a review!`,
        link:      '/dashboard/my-swaps',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Swap marked as completed. Credits and review eligibility activated!',
      data: swap,
    });
  } catch (error) {
    console.error('completeSwap error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while completing swap',
      error: error.message,
    });
  }
};

module.exports = { createSwap, getMySwaps, getMyRequests, updateSwapStatus, completeSwap };
