// server\routes\puzzleRoutes.js
const express = require('express');
const router = express.Router();
const puzzleController = require('../controllers/puzzleController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route   POST /api/puzzles
// @desc    Create new puzzle
router.post('/', authMiddleware, puzzleController.createPuzzle);

// @route   GET /api/puzzles
// @desc    Get all puzzles
router.get('/', puzzleController.getPuzzles);

// @route   DELETE /api/puzzles/:id
// @desc    Delete puzzle
router.delete('/:id', authMiddleware, puzzleController.deletePuzzle);
router.put('/:id', authMiddleware, puzzleController.updatePuzzle);

module.exports = router;

