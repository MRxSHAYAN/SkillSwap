require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

// 1. Serverless Handler Wrapper (For Vercel / Production)
module.exports = async (req, res) => {
  try {
    // Ensure database connects before handling incoming requests
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

// 2. Local Host Execution (Runs only when NOT in production)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`\n SkillSwapp Local Server Running`);
        console.log(`   ├─ Port:    ${PORT}`);
        console.log(`   ├─ Mode:    ${process.env.NODE_ENV || 'development'}`);
        console.log(`   ├─ Health:  http://localhost:${PORT}/api/health`);
        console.log(`   └─ Auth:    http://localhost:${PORT}/api/auth\n`);
      });
    })
    .catch((error) => {
      console.error('Failed to start server locally:', error.message);
      process.exit(1);
    });
}