// client\src\components\ToolList.js
import { useState } from 'react';

const ToolList = ({ tools, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    subheading: '',
    image: '',
    url: ''
  });

  const handleEdit = (tool) => {
    setEditingId(tool._id);
    setEditData({
      title: tool.title,
      subheading: tool.subheading || '',
      image: tool.image || '',
      url: tool.url
    });
  };

  const handleUpdate = (id) => {
    onUpdate(id, editData);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="tool-list">
      <h2>Tools</h2>
      {tools.length === 0 ? (
        <p className="no-tools">No tools added yet</p>
      ) : (
        tools.map((tool) => (
          <div key={tool._id} className="tool-item">
            {editingId === tool._id ? (
              <div className="tool-edit-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subheading</label>
                  <input
                    type="text"
                    value={editData.subheading}
                    onChange={(e) => setEditData({...editData, subheading: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={editData.image}
                    onChange={(e) => setEditData({...editData, image: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Tool URL *</label>
                  <input
                    type="text"
                    value={editData.url}
                    onChange={(e) => setEditData({...editData, url: e.target.value})}
                    required
                  />
                </div>

                <div className="tool-edit-actions">
                  <button 
                    onClick={() => handleUpdate(tool._id)} 
                    className="save-btn"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="tool-content">
                  <h3>{tool.title}</h3>
                  {tool.subheading && <p>{tool.subheading}</p>}
                  {tool.image && (
                    <img 
                      src={tool.image} 
                      alt={tool.title} 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                        e.target.style.border = '1px solid #ff0000';
                      }}
                    />
                  )}
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="tool-link"
                  >
                    Visit Tool
                  </a>
                </div>
                <div className="tool-actions">
                  <button 
                    onClick={() => handleEdit(tool)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(tool._id)}
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

export default ToolList;

