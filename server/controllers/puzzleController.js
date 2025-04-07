// server\controllers\puzzleController.js
const Puzzle = require('../models/Puzzle');
// Create new puzzle
exports.createPuzzle = async (req, res) => {
  try {
    const { heading, ytVideo, screenshots } = req.body;
    
    const newPuzzle = new Puzzle({
      heading,
      ytVideo,
      screenshots
    });

    await newPuzzle.save();
    res.status(201).json(newPuzzle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all puzzles
exports.getPuzzles = async (req, res) => {
  try {
    const puzzles = await Puzzle.find().sort({ createdAt: -1 });
    res.json(puzzles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete puzzle
exports.deletePuzzle = async (req, res) => {
  try {
    await Puzzle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Puzzle deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePuzzle = async (req, res) => {
  try {
    const { heading, ytVideo, screenshots } = req.body;
    
    const updatedPuzzle = await Puzzle.findByIdAndUpdate(
      req.params.id,
      { heading, ytVideo, screenshots },
      { new: true }
    );

    if (!updatedPuzzle) {
      return res.status(404).json({ message: 'Puzzle not found' });
    }

    res.json(updatedPuzzle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

