// server\server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authController = require('./controllers/authController');


// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Initialize Admin (Run once)
authController.initAdmin();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/puzzles', require('./routes/puzzleRoutes'));
app.use('/api/tools', require('./routes/toolRoutes'));
app.use('/api/shop', require('./routes/shopRoutes'));
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

