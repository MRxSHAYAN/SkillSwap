const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    // The user who receives this notification
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification recipient is required'],
    },

    // The user who triggered this notification
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification sender is required'],
    },

    // Event category/type
    type: {
      type: String,
      enum: ['SWAP_REQUEST', 'SWAP_ACCEPTED', 'SWAP_DECLINED', 'NEW_MESSAGE'],
      required: [true, 'Notification type is required'],
    },

    // Descriptive message text
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
    },

    // Unread/read flag
    read: {
      type: Boolean,
      default: false,
    },

    // Target route to navigate when clicked
    link: {
      type: String,
      default: '/dashboard/my-swaps',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Index for fast query of unread & recent notifications per user
notificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
