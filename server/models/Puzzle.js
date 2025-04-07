// server\models\Puzzle.js
const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
  heading: { 
    type: String, 
    required: true 
  },
  ytVideo: { 
    type: String,
    default: '' 
  },
  screenshots: [{ 
    type: String 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Puzzle', puzzleSchema);