require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Serverless Handler Wrapper
module.exports = async (req, res) => {
  try {
    // Ensure database connects before handling request
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Serverless DB Handler Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Database Connection Error', 
      error: error.message 
    });
  }
};