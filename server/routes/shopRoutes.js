// server\routes\shopRoutes.js
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/shop
// @desc    Create new shop item
router.post('/', authMiddleware, shopController.createShopItem);

// @route   GET /api/shop
// @desc    Get all shop items
router.get('/', shopController.getShopItems);

// @route   DELETE /api/shop/:id
// @desc    Delete shop item
router.delete('/:id', authMiddleware, shopController.deleteShopItem);

// @route   PUT /api/shop/:id
// @desc    Update shop item
router.put('/:id', authMiddleware, shopController.updateShopItem);

module.exports = router;

