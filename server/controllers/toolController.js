// server\controllers\toolController.js
const Tool = require('../models/Tool');
// Create new tool
exports.createTool = async (req, res) => {
  try {
    const { title, subheading, image, url } = req.body;
    
    const newTool = new Tool({
      title,
      subheading,
      image,
      url
    });

    await newTool.save();
    res.status(201).json(newTool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tools
exports.getTools = async (req, res) => {
  try {
    const tools = await Tool.find().sort({ title: 1 });
    res.json(tools);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete tool
exports.deleteTool = async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update tool
exports.updateTool = async (req, res) => {
  try {
    const { title, subheading, image, url } = req.body;
    
    const updatedTool = await Tool.findByIdAndUpdate(
      req.params.id,
      { title, subheading, image, url },
      { new: true }
    );

    if (!updatedTool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    res.json(updatedTool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

