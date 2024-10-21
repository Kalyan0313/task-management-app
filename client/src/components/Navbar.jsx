import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Importing the external CSS

const Navbar = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light full-screen-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto"> {/* Added ms-auto for right alignment */}
            {!isAuthenticated ? (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            ) : (
              <button 
                className="btn btn-outline-danger" 
                onClick={() => { logout(); navigate('/login'); }} 
                aria-label="Logout"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;