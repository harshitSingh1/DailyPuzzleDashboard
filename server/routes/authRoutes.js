// server\routes\authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', authController.login);

// @route   PUT /api/auth/update-password
// @desc    Update admin password (protected route)
router.put('/update-password', authMiddleware, authController.updatePassword);

module.exports = router;

