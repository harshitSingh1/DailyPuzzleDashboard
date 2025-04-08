// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authController = require('./controllers/authController');

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-domain.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Initialize Admin
authController.initAdmin();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/puzzles', require('./routes/puzzleRoutes'));
app.use('/api/tools', require('./routes/toolRoutes'));
app.use('/api/shop', require('./routes/shopRoutes'));

// Health Check
app.get('/', (req, res) => res.send('PuzzleMaster API Running'));
app.get('/ping', (req, res) => res.send('pong'));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;