// server\controllers\shopController.js
const mongoose = require('mongoose');
const Shop = require('../models/Shop');

exports.createShopItem = async (req, res) => {
  try {
    const { image, productName, description, rating, buttonText, url } = req.body;
    
    // Validate required fields
    if (!image || !productName || !url) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newShopItem = new Shop({
      image,
      productName,
      description: description || '',
      rating: rating ? parseFloat(rating) : null,
      buttonText: buttonText || 'Buy Now',
      url
    });

    await newShopItem.save();
    res.status(201).json(newShopItem);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getShopItems = async (req, res) => {
  try {
    const shopItems = await Shop.find().sort({ productName: 1 });
    res.json(shopItems);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteShopItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedItem = await Shop.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Shop item not found' });
    }

    res.json({ message: 'Shop item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateShopItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const { image, productName, description, rating, buttonText, url } = req.body;
    
    // Validate required fields
    if (!image || !productName || !url) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedItem = await Shop.findByIdAndUpdate(
      id,
      { 
        image,
        productName,
        description: description || '',
        rating: rating ? parseFloat(rating) : null,
        buttonText: buttonText || 'Buy Now',
        url
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Shop item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ 
      message: err.message.includes('validation') 
        ? 'Validation failed: ' + err.message 
        : 'Server error' 
    });
  }
};
