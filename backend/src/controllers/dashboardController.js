const Swap = require('../models/Swap');
const ReviewModel = require('../models/Review');

/**
 * @desc    Get aggregated dashboard overview data for the logged-in user
 * @route   GET /api/dashboard/overview
 * @access  Private (requires valid JWT via protect middleware)
 */
const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    // ─── Fetch all swaps involving this user ───────────────────────────────
    const [allSwaps, reviews] = await Promise.all([
      Swap.find({
        $or: [{ creator: userId }, { partner: userId }],
      })
        .populate('creator', 'fullName avatarUrl skillsTeach')
        .populate('partner', 'fullName avatarUrl skillsTeach')
        .sort({ createdAt: -1 }),

      ReviewModel.find({ reviewer: userId }).sort({ createdAt: -1 }),
    ]);

    // ─── Compute Stats ──────────────────────────────────────────────────────
    const completedSwaps = allSwaps.filter((s) => s.status === 'completed');
    const acceptedSwaps  = allSwaps.filter((s) => s.status === 'accepted' || s.status === 'matched');

    const swapsCompleted     = completedSwaps.length;
    const activeMatchesCount = acceptedSwaps.length;

    const durationToHours = { '30 Mins': 0.5, '1 Hour': 1, '2 Hours': 2 };

    let totalHoursTaught  = 0;
    let totalHoursLearned = 0;

    completedSwaps.forEach((swap) => {
      const hrs = durationToHours[swap.preferredDuration] ?? 1;
      if (swap.creator && swap.creator._id.toString() === userId.toString()) {
        totalHoursTaught += hrs;
      } else {
        totalHoursLearned += hrs;
      }
    });

    let averageRating = 0;
    if (reviews.length > 0) {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      averageRating = Number((sum / reviews.length).toFixed(1));
    }

    const totalCredits = 100 + swapsCompleted * 10;

    const stats = {
      totalCredits,
      swapsCompleted,
      totalHoursTaught:  Number(totalHoursTaught.toFixed(1)),
      totalHoursLearned: Number(totalHoursLearned.toFixed(1)),
      totalHours:        Number((totalHoursTaught + totalHoursLearned).toFixed(1)),
      activeMatchesCount,
      averageRating,
      reviewCount: reviews.length,
    };

    // ─── Active Exchanges ───────────────────────────────────────────────────
    // ONLY filter and display swaps with status: 'accepted' or 'matched'
    // Pending or rejected proposals MUST NOT appear in Active Skill Exchanges!
    const activeExchanges = acceptedSwaps
      .slice(0, 5)
      .map((swap) => {
        const isCreator = swap.creator && swap.creator._id.toString() === userId.toString();
        const partnerDoc = isCreator ? swap.partner : swap.creator;

        return {
          id:          swap._id,
          status:      'Confirmed',
          teaching:    isCreator ? swap.offeredSkill : swap.wantedSkill,
          learning:    isCreator ? swap.wantedSkill  : swap.offeredSkill,
          nextSession: swap.nextSession
            ? new Date(swap.nextSession).toLocaleString('en-US', {
                weekday: 'short',
                month:   'short',
                day:     'numeric',
                hour:    'numeric',
                minute:  '2-digit',
              })
            : 'Not scheduled yet',
          partner: partnerDoc
            ? {
                id:        partnerDoc._id,
                name:      partnerDoc.fullName,
                avatarUrl: partnerDoc.avatarUrl || null,
                role:      partnerDoc.skillsTeach?.[0] ? `${partnerDoc.skillsTeach[0]} Specialist` : 'Skill Swap Partner',
              }
            : null,
        };
      });

    // ─── Activity Stream ────────────────────────────────────────────────────
    const activityStream = allSwaps.slice(0, 8).map((swap) => {
      const isCreator = swap.creator && swap.creator._id.toString() === userId.toString();
      const otherPerson = isCreator ? swap.partner : swap.creator;
      const otherName   = otherPerson?.fullName || 'A community member';
      const initials    = otherName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      let action  = '';
      let tag     = '';

      switch (swap.status) {
        case 'open':
          action = isCreator
            ? 'You posted a new swap offer'
            : `${otherName} posted a swap offer`;
          tag = 'Open';
          break;
        case 'pending':
          action = isCreator
            ? `You sent a swap proposal to ${otherName}`
            : `${otherName} sent you a swap proposal`;
          tag = 'Pending';
          break;
        case 'accepted':
        case 'matched':
          action = `Swap proposal accepted with ${otherName}`;
          tag = 'Confirmed';
          break;
        case 'rejected':
          action = `Proposal with ${otherName} was declined`;
          tag = 'Declined';
          break;
        case 'completed':
          action = `Completed swap with ${otherName}`;
          tag = 'Completed';
          break;
        case 'cancelled':
          action = `Swap with ${otherName} was cancelled`;
          tag = 'Cancelled';
          break;
        default:
          action = 'Swap activity';
          tag = 'Update';
      }

      const now   = new Date();
      const diff  = now - new Date(swap.updatedAt || swap.createdAt);
      const mins  = Math.floor(diff / 60000);
      const hours = Math.floor(mins  / 60);
      const days  = Math.floor(hours / 24);

      let timeAgo = '';
      if (mins < 1)        timeAgo = 'just now';
      else if (mins < 60)  timeAgo = `${mins}m ago`;
      else if (hours < 24) timeAgo = `${hours}h ago`;
      else if (days === 1) timeAgo = 'Yesterday';
      else                  timeAgo = `${days}d ago`;

      return {
        id:      swap._id,
        user:    isCreator ? 'You' : otherName,
        initials,
        action,
        details: `${swap.offeredSkill} ↔ ${swap.wantedSkill}`,
        time:    timeAgo,
        tag,
      };
    });

    return res.status(200).json({
      success: true,
      stats,
      activeExchanges,
      activityStream,
    });
  } catch (error) {
    console.error('getDashboardOverview error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
      error:   error.message,
    });
  }
};

module.exports = { getDashboardOverview };
