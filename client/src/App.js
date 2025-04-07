import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles.css';

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verify token on app load and set up auth state
    const token = localStorage.getItem('token');
    console.log('App loaded with token:', token);
    
    // Set initial auth state
    setIsAuthenticated(!!token);
    setAuthChecked(true);

    // Set up listener for storage changes (like from other tabs)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsAuthenticated(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!authChecked) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="container">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" replace state={{ from: '/' }} />
              )
            } 
          />
          <Route 
            path="/tools" 
            element={
              isAuthenticated ? (
                <Tools />
              ) : (
                <Navigate to="/login" replace state={{ from: '/tools' }} />
              )
            } 
          />
          <Route 
            path="/shop" 
            element={
              isAuthenticated ? (
                <Shop />
              ) : (
                <Navigate to="/login" replace state={{ from: '/shop' }} />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? (
                <Profile />
              ) : (
                <Navigate to="/login" replace state={{ from: '/profile' }} />
              )
            } 
          />
          {/* Catch-all route for undefined paths */}
          <Route 
            path="*"
            element={
              <Navigate to={isAuthenticated ? '/' : '/login'} replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;