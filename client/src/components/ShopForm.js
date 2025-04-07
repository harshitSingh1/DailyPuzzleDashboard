// client\src\components\ShopForm.js
import { useState } from 'react';

const ShopForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    image: '',
    productName: '',
    description: '',
    rating: '',
    buttonText: 'Buy Now',
    url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert rating to number and validate
    const ratingValue = parseFloat(formData.rating);
    const validatedRating = isNaN(ratingValue) ? null : Math.min(5, Math.max(0, ratingValue));
    
    onSubmit({
      ...formData,
      rating: validatedRating
    });
    
    setFormData({
      image: '',
      productName: '',
      description: '',
      rating: '',
      buttonText: 'Buy Now',
      url: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Image URL *</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({...formData, image: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Product Name *</label>
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => setFormData({...formData, productName: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Rating (0-5)</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={formData.rating}
          onChange={(e) => setFormData({...formData, rating: e.target.value})}
          placeholder="e.g. 4.5"
        />
      </div>

      <div className="form-group">
        <label>Button Text</label>
        <input
          type="text"
          value={formData.buttonText}
          onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Product URL *</label>
        <input
          type="text"
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
};

export default ShopForm;

