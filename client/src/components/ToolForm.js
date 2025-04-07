// client\src\components\ToolForm.js
import { useState } from 'react';

const ToolForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    subheading: '',
    image: '',
    url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      subheading: '',
      image: '',
      url: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="tool-form">
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          placeholder="Enter tool title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Subheading</label>
        <input
          type="text"
          placeholder="Enter subheading (optional)"
          value={formData.subheading}
          onChange={(e) => setFormData({...formData, subheading: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          placeholder="Enter image URL (optional)"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Tool URL *</label>
        <input
          type="text"
          placeholder="Enter tool URL"
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Tool
      </button>
    </form>
  );
};

export default ToolForm;

