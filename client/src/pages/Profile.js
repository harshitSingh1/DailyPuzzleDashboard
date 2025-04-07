// client/src/pages/Profile.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../api';

const Profile = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      
      if (response.data.success) {
        setMessage('Password updated successfully');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
        // Log out after password change
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
      console.error('Update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Admin Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        {message && (
          <div className="alert success">
            {message}
            {message.includes('successfully') && " You will be logged out shortly..."}
          </div>
        )}
        {error && <div className="alert error">{error}</div>}
        
        <div className="form-group">
          <label>Current Password *</label>
          <input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label>New Password * (min 6 characters)</label>
          <input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

