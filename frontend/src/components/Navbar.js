import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onSignOut }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setUserName(user.name || user.email);
      // Set a timeout to automatically sign out the user after 1 hour (3600000 ms)
      const signOutTimeout = setTimeout(() => {
        onSignOut();
      }, 3600000);

      // Clear the timeout if the component unmounts or user changes
      return () => clearTimeout(signOutTimeout);
    } else {
      setUserName("");
      setIsDropdownOpen(false); // Close dropdown if user logs out
    }
  }, [user, onSignOut]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  // Hide navbar on admin panel
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="navbar">
      {/* Left side logo and links */}
      <div className="left-section">
        <div className="logo">
          <Link to="/">MovieBooking</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      {/* Right side search bar and user profile */}
      <div className="right-section">
        <div className="search-bar">
          <input type="text" placeholder="Search movies..." />
          <button type="submit">Search</button>
        </div>
        <div className="user-profile" ref={dropdownRef}>
          {user ? (
            <>
              <span className="user-name" onClick={toggleDropdown}>
                {userName}
              </span>
              {isDropdownOpen && (
                <div className="dropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={handleItemClick}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/show-tickets"
                    className="dropdown-item"
                    onClick={handleItemClick}
                  >
                    Show Tickets
                  </Link>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      handleItemClick();
                      onSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="auth-links">
              <Link to="/signin">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
