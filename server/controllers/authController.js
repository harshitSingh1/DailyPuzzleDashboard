// server\controllers\authController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Initialize admin account (run once)
exports.initAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne();
    if (!existingAdmin) {
      const admin = new Admin({
        username: process.env.ADMIN_INITIAL_USERNAME,
        password: process.env.ADMIN_INITIAL_PASSWORD
      });
      await admin.save();
      console.log('✅ Default admin created');
    }
  } catch (err) {
    console.error('❌ Admin init error:', err);
  }
};

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    // Ensure consistent response format
    res.json({ 
      success: true,
      token: token,
      user: {
        id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
};

// server/controllers/authController.js
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new password are required' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from current password' });
    }

    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ 
      success: true,
      message: 'Password updated successfully' 
    });
  } catch (err) {
    console.error('Password update error:', err);
    res.status(500).json({ 
      message: err.message.includes('validation') 
        ? 'Password validation failed: must be at least 6 characters'
        : 'Server error during password update'
    });
  }
};
