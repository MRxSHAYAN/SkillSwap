const mongoose = require('mongoose');

// Cache the connection state across serverless function invocations
let isConnected = false;

const connectDB = async () => {
  // If already connected, reuse the existing connection
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Prevents queries from hanging indefinitely if connection drops
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error; // Throw error so middleware/caller can handle it safely instead of process.exit(1)
  }
};

// Connection event listeners attached once globally
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
  isConnected = false;
});

module.exports = connectDB;