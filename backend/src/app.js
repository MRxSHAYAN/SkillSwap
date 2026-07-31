const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// allow json and form data
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// allow frontend to make requests
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// test route to check if server is online
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SkillSwapp API is running',
    timestamp: new Date().toISOString(),
  });
});

// auth routes (login & register)
app.use('/api/auth', authRoutes);

// review routes
app.use('/api/reviews', reviewRoutes);

// newsletter routes
app.use('/api/newsletter', newsletterRoutes);

// contact routes
app.use('/api/contact', contactRoutes);



// handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// handle server errors
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

module.exports = app;

