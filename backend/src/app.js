const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Allow json and form data
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Dynamic CORS configuration (Allows localhost AND your deployed frontend)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
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

// Auth routes (login & register)
app.use('/api/auth', authRoutes);

// Review routes
app.use('/api/reviews', reviewRoutes);

// Newsletter routes
app.use('/api/newsletter', newsletterRoutes);

// Contact routes
app.use('/api/contact', contactRoutes);

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