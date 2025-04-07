// server\routes\toolRoutes.js
const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/tools
// @desc    Create new tool
router.post('/', authMiddleware, toolController.createTool);

// @route   GET /api/tools
// @desc    Get all tools
router.get('/', toolController.getTools);

// @route   DELETE /api/tools/:id
// @desc    Delete tool
router.delete('/:id', authMiddleware, toolController.deleteTool);

// @route   PUT /api/tools/:id
// @desc    Update tool
router.put('/:id', authMiddleware, toolController.updateTool);

module.exports = router;

