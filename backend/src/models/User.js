const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never return password in queries by default
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    languages: {
      type: [String],
      required: [true, 'At least one language is required'],
    },
    skillsTeach: {
      type: [String],
      required: [true, 'At least one skill is required'],
    },
    username: {
      type: String,
      trim: true,
      sparse: true,   // allows missing username fields without breaking unique index
      unique: true,   // prevents duplicate usernames
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [300, 'Bio cannot exceed 300 characters'],
      default: null,
    },
    timezone: {
      type: String,
      trim: true,
      maxlength: [100, 'Timezone cannot exceed 100 characters'],
      default: null,
    },
    avatarUrl: {
      type: String,
      default: null, // null = render default person icon in UI
    },
    // Notification preferences
    notificationPrefs: {
      emailSwaps:       { type: Boolean, default: true  },
      emailMessages:    { type: Boolean, default: true  },
      emailReminders:   { type: Boolean, default: true  },
      marketingUpdates: { type: Boolean, default: false },
    },
    // Swap preferences
    swapPrefs: {
      acceptProposals: { type: Boolean, default: true  },
      meetingLink:     { type: String,  default: ''    },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

userSchema.pre('save', async function (next) {
  // Only hash if password was modified (not on every save)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
