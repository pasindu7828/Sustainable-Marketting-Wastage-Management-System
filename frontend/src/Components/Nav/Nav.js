import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/mainhome" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/adduser" className="navbar-link">Add User</Link>
          </li>

          <li className="navbar-item">
            <Link to="/userdetails" className="navbar-link patients-link">
              User Detail
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;