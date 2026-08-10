const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const swapRoutes = require('./routes/swapRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const matchRoutes = require('./routes/matchRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const creditRoutes = require('./routes/creditRoutes');

const app = express();

// Allow json and form data
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Dynamic CORS configuration (Allows localhost AND your deployed frontend)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL, // e.g. https://your-frontend.vercel.app
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server proxies)
      if (!origin) return callback(null, true);
      
      // If origin is in allowed origins or dynamically matches Vercel deployments
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      
      return callback(new Error('CORS Policy Error: Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Test route to check if server is online
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SkillSwapp API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/credits', creditRoutes);

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;