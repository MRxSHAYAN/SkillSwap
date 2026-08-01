require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Middleware to connect DB on each request in Vercel
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Export app instance for Vercel
module.exports = app;