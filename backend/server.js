require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

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