import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import TicketBooking from './components/TicketBooking';
import UserProfileEdit from './components/UserProfileEdit';
import api from './api';
import UserProfileShowTickets from './components/UserProfileShowTickets';
import About from './components/About';
import Contact from './components/Contact'; // Import Contact
import Footer from './components/Footer'; // Import Footer
import './App.css'; // Import App.css for additional styling

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error('Failed to fetch user profile', err);
          handleSignOut(); // Sign out if token is invalid
        }
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null); // Update state to null when the user signs out
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onSignOut={handleSignOut} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/book/:movieId" element={<TicketBooking />} />
            <Route path="/show-tickets" element={<UserProfileShowTickets />} />
            <Route path="/profile" element={<UserProfileEdit />} /> {/* Add this line */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> {/* Add this line */}
          </Routes>
        </div>
        <Footer /> {/* Add Footer */}
      </div>
    </Router>
  );
};

export default App;
