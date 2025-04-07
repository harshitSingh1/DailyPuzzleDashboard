// client\src\components\PuzzleList.js
import { useState } from 'react';

const PuzzleList = ({ puzzles, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    heading: '',
    ytVideo: '',
    screenshots: []
  });
  const [currentScreenshot, setCurrentScreenshot] = useState('');

  const handleEditClick = (puzzle) => {
    setEditingId(puzzle._id);
    setEditData({
      heading: puzzle.heading,
      ytVideo: puzzle.ytVideo || '',
      screenshots: puzzle.screenshots || []
    });
  };

  const handleAddScreenshot = () => {
    if (currentScreenshot.trim()) {
      setEditData({
        ...editData,
        screenshots: [...editData.screenshots, currentScreenshot]
      });
      setCurrentScreenshot('');
    }
  };

  const handleRemoveScreenshot = (index) => {
    const updatedScreenshots = editData.screenshots.filter((_, i) => i !== index);
    setEditData({ ...editData, screenshots: updatedScreenshots });
  };

  const handleUpdate = async () => {
    await onUpdate(editingId, editData);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="puzzle-list">
      <h2>Puzzle Solutions</h2>
      {puzzles.length === 0 ? (
        <p className="no-puzzles">No puzzles added yet</p>
      ) : (
        puzzles.map((puzzle) => (
          <div key={puzzle._id} className="puzzle-item">
            {editingId === puzzle._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Heading *</label>
                  <input
                    type="text"
                    value={editData.heading}
                    onChange={(e) => setEditData({...editData, heading: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>YouTube URL</label>
                  <input
                    type="text"
                    value={editData.ytVideo}
                    onChange={(e) => setEditData({...editData, ytVideo: e.target.value})}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div className="form-group">
                  <label>Screenshots</label>
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
                  
                  {editData.screenshots.length > 0 && (
                    <div className="screenshot-preview-list">
                      {editData.screenshots.map((url, index) => (
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

                <div className="edit-actions">
                  <button onClick={handleUpdate} className="save-btn">
                    Save Changes
                  </button>
                  <button onClick={handleCancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="puzzle-content">
                  <h3>{puzzle.heading}</h3>
                  
                  {puzzle.ytVideo && (
                    <div className="video-section">
                      <h4>Video Solution:</h4>
                      <div className="video-embed">
                        {puzzle.ytVideo.includes('youtube.com') ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${puzzle.ytVideo.split('v=')[1]?.split('&')[0]}`}
                            frameBorder="0"
                            allowFullScreen
                            title={puzzle.heading}
                          />
                        ) : (
                          <a href={puzzle.ytVideo} target="_blank" rel="noopener noreferrer">
                            View Video Solution
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {puzzle.screenshots && puzzle.screenshots.length > 0 && (
                    <div className="screenshots-section">
                      <h4>Solution Screenshots:</h4>
                      <div className="screenshot-grid">
                        {puzzle.screenshots.map((url, index) => (
                          <div key={index} className="screenshot-item">
                            <img 
                              src={url} 
                              alt={`Solution ${index + 1}`} 
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                                e.target.style.border = '1px solid #ff0000';
                              }}
                            />
                            <span>Screenshot {index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="puzzle-actions">
                  <button 
                    onClick={() => handleEditClick(puzzle)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(puzzle._id)}
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

export default PuzzleList;

