require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Connect to MongoDB once when the serverless function initializes
connectDB().catch((err) => {
  console.error('Initial DB Connection Error:', err.message);
});

// Export the Express app for Vercel
module.exports = app;