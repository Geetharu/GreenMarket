import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌿 GreenMarket</div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
