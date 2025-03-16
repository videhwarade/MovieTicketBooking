import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()} MovieBooking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
