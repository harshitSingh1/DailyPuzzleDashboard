// server\models\Tool.js
const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  subheading: { 
    type: String 
  },
  image: { 
    type: String 
  },
  url: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('Tool', toolSchema);

