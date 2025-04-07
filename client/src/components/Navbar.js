// client\src\components\Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">PuzzleMaster Admin</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/profile">Profile</Link>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

