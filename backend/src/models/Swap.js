const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema(
  {
    // The user who created/posted this swap offer
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
    },

    // The matched partner (null until a match is made)
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // What the creator is offering to teach
    offeredSkill: {
      type: String,
      required: [true, 'Offered skill is required'],
      trim: true,
      maxlength: [100, 'Offered skill cannot exceed 100 characters'],
    },

    // What the creator wants to learn
    wantedSkill: {
      type: String,
      required: [true, 'Wanted skill is required'],
      trim: true,
      maxlength: [100, 'Wanted skill cannot exceed 100 characters'],
    },

    // Skill category
    category: {
      type: String,
      enum: ['Development', 'Design', 'Business', 'Languages', 'Marketing', 'Other'],
      default: 'Other',
    },

    // Optional description / goals
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },

    // Creator's proficiency level
    skillLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },

    // Preferred session length
    preferredDuration: {
      type: String,
      enum: ['30 Mins', '1 Hour', '2 Hours'],
      default: '1 Hour',
    },

    // Scheduling preference
    availability: {
      type: String,
      enum: ['Weekdays', 'Weekends', 'Flexible'],
      default: 'Flexible',
    },

    // Lifecycle status
    status: {
      type: String,
      enum: ['open', 'pending', 'accepted', 'rejected', 'matched', 'completed', 'cancelled'],
      default: 'open',
    },

    // Scheduled date/time for the next session (set when matched)
    nextSession: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Index for fast lookup by creator or partner
swapSchema.index({ creator: 1, status: 1 });
swapSchema.index({ partner: 1, status: 1 });

const Swap = mongoose.model('Swap', swapSchema);

module.exports = Swap;
