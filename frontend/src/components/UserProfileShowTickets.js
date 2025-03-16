import React, { useState, useEffect } from 'react';
import api from '../api';
import './UserProfileShowTickets.css';

const UserProfileShowTickets = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await api.get('/bookings/show-tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    };
    fetchBookings();
  }, []);

  // Close the modal
  const closeModal = () => setSelectedBooking(null);

  // Open the modal with booking details
  const openModal = (booking) => setSelectedBooking(booking);

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-header">Your Bookings</h2>
      <div className="booking-grid">
        {bookings.map((booking) => {
          if (!booking || !booking.movie) {
            return null;
          }
          return (
            <div
              key={booking._id}
              className="booking-card"
              onClick={() => openModal(booking)}
            >
              <div className="booking-card-content">
                {/* Movie Poster */}
                <img
                  src={booking.movie.poster}
                  alt={booking.movie.title}
                  className="movie-poster"
                />
                <div className="card-text">
                  <h3 className="movie-title">{booking.movie.title}</h3>
                  <p className="seat-count">Seats: {booking.seatCount}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Seat Details */}
      {selectedBooking && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-header">Booking Details</h2>
            <div className="modal-content">
              <img
                src={selectedBooking.movie.poster}
                alt={selectedBooking.movie.title}
                className="modal-image"
              />
              <h3 className="modal-title">{selectedBooking.movie.title}</h3>
              <p className="modal-text">
                <strong>Seats: </strong>{selectedBooking.seatCount}
              </p>
              <p className="modal-text">
                <strong>Seat Details: </strong>
                {Array.isArray(selectedBooking.selectedSeats) &&
                selectedBooking.selectedSeats.length > 0
                  ? selectedBooking.selectedSeats.join(', ')
                  : 'No seat details available'}
              </p>
            </div>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileShowTickets;
