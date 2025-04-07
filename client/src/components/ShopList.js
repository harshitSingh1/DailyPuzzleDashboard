// client\src\components\ShopList.js
import { useState } from 'react';

const ShopList = ({ items, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    image: '',
    productName: '',
    description: '',
    rating: '',
    buttonText: 'Buy Now',
    url: ''
  });
  const [error, setError] = useState('');

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      image: item.image,
      productName: item.productName,
      description: item.description || '',
      rating: item.rating || '',
      buttonText: item.buttonText || 'Buy Now',
      url: item.url
    });
    setError('');
  };

  const handleUpdate = async () => {
    try {
      // Validate required fields
      if (!editData.image || !editData.productName || !editData.url) {
        throw new Error('Image, Product Name and URL are required');
      }

      // Convert rating to number
      const ratingValue = editData.rating ? parseFloat(editData.rating) : null;
      const validatedRating = ratingValue !== null 
        ? Math.min(5, Math.max(0, ratingValue)) 
        : null;

      await onUpdate(editingId, {
        ...editData,
        rating: validatedRating
      });
      
      setEditingId(null);
    } catch (err) {
      setError(err.message);
      console.error('Update failed:', err);
    }
  };

  const renderRating = (rating) => {
    if (!rating) return 'No rating';
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <div className="rating-display">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {hasHalfStar && <span className="star half">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}
        <span className="rating-value">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="list">
      <h2>Shop Items</h2>
      {error && <div className="error-message">{error}</div>}
      {items.length === 0 ? (
        <p className="no-items">No items added yet</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="list-item">
            {editingId === item._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Image URL *</label>
                  <input
                    type="text"
                    value={editData.image}
                    onChange={(e) => setEditData({...editData, image: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={editData.productName}
                    onChange={(e) => setEditData({...editData, productName: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={editData.rating}
                    onChange={(e) => setEditData({...editData, rating: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Button Text</label>
                  <input
                    type="text"
                    value={editData.buttonText}
                    onChange={(e) => setEditData({...editData, buttonText: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Product URL *</label>
                  <input
                    type="text"
                    value={editData.url}
                    onChange={(e) => setEditData({...editData, url: e.target.value})}
                    required
                  />
                </div>

                <div className="edit-actions">
                  <button onClick={handleUpdate} className="save-btn">
                    Save
                  </button>
                  <button 
                    onClick={() => setEditingId(null)} 
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="item-content">
                  <img src={item.image} alt={item.productName} className="item-image" />
                  <div className="item-details">
                    <h3>{item.productName}</h3>
                    {item.description && <p>{item.description}</p>}
                    {renderRating(item.rating)}
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="buy-btn"
                    >
                      {item.buttonText || 'Buy Now'}
                    </a>
                  </div>
                </div>
                <div className="item-actions">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ShopList;

