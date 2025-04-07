// client\src\components\PuzzleForm.js

import { useState } from 'react';

const PuzzleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    heading: '',
    ytVideo: '',
    screenshots: []
  });
  const [currentScreenshot, setCurrentScreenshot] = useState('');

  const handleAddScreenshot = () => {
    if (currentScreenshot.trim()) {
      setFormData({
        ...formData,
        screenshots: [...formData.screenshots, currentScreenshot]
      });
      setCurrentScreenshot('');
    }
  };

  const handleRemoveScreenshot = (index) => {
    const updatedScreenshots = formData.screenshots.filter((_, i) => i !== index);
    setFormData({ ...formData, screenshots: updatedScreenshots });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.heading) { // Only heading is required now
      onSubmit({
        heading: formData.heading,
        ytVideo: formData.ytVideo || '',
        screenshots: formData.screenshots
      });
      setFormData({
        heading: '',
        ytVideo: '',
        screenshots: []
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Puzzle Heading *</label>
        <input
          type="text"
          value={formData.heading}
          onChange={(e) => setFormData({...formData, heading: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>YouTube Video URL (Optional)</label>
        <input
          type="text"
          value={formData.ytVideo}
          onChange={(e) => setFormData({...formData, ytVideo: e.target.value})}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div className="form-group">
        <label>Screenshot URLs (Optional)</label>
        <div className="screenshot-input">
          <input
            type="text"
            placeholder="Enter image URL"
            value={currentScreenshot}
            onChange={(e) => setCurrentScreenshot(e.target.value)}
          />
          <button 
            type="button" 
            onClick={handleAddScreenshot}
            className="add-btn"
          >
            Add
          </button>
        </div>
        
        {formData.screenshots.length > 0 && (
          <div className="screenshot-preview-list">
            {formData.screenshots.map((url, index) => (
              <div key={index} className="screenshot-item">
                <span>{url}</span>
                <button 
                  type="button"
                  onClick={() => handleRemoveScreenshot(index)}
                  className="remove-btn"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="submit-btn">Add Puzzle Solution</button>
    </form>
  );
};

export default PuzzleForm;

