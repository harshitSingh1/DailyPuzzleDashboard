// server\models\Shop.js
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  image: { 
    type: String, 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  rating: { 
    type: Number,
    min: 0,
    max: 5
  },
  buttonText: { 
    type: String,
    default: 'Buy Now' 
  },
  url: { 
    type: String, 
    required: true 
  }
});

module.exports = mongoose.model('Shop', shopSchema);

