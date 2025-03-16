
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketBooking.css';

const TicketBooking = () => {
  const { movieId } = useParams(); // Get movieId from the URL
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState([]); // Seat layout
  const [reservedSeats, setReservedSeats] = useState([]); // Reserved seats
  const [selectedSeats, setSelectedSeats] = useState([]); // User selected seats
  const [seatCount, setSeatCount] = useState(0); // Number of selected seats
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch movie details and reserved seats
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // Redirect to signin if not logged in
    } else {
      // Fetch movie details
      axios.get(`http://localhost:5000/api/movies/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setMovie(response.data);

        // Example seat layout (you can customize this)
        const seatLayout = [
          ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'],
          ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12'],
          ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12'],
          ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12'],
          // ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12'],
          // ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
          // ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12'],
          // ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12'],
          // ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12'],
          // ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9', 'J10', 'J11', 'J12']
        ];

        setSeats(seatLayout); // Set the seat layout

        // Fetch reserved seats
        axios.get(`http://localhost:5000/api/bookings/reserved-seats/${movieId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(res => {
          setReservedSeats(res.data.reservedSeats); // Set the reserved seats
        }).catch(error => {
          console.error("Error fetching reserved seats:", error);
        });

        setLoading(false);
      }).catch(error => {
        console.error("Error fetching movie details:", error);
      });
    }
  }, [movieId, navigate]);

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    if (reservedSeats.includes(seat)) {
      // Prevent selection if the seat is already reserved
      alert(`Seat ${seat} is already reserved.`);
      return;
    }

    let updatedSelectedSeats;
    if (selectedSeats.includes(seat)) {
      updatedSelectedSeats = selectedSeats.filter(s => s !== seat); // Deselect if already selected
    } else {
      updatedSelectedSeats = [...selectedSeats, seat]; // Select the seat
    }
    setSelectedSeats(updatedSelectedSeats);
    setSeatCount(updatedSelectedSeats.length); // Update the seat count
  };

  // Handle the booking process
  const handleBooking = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin'); // If not signed in, redirect to sign in page
    } else {
      axios.post('http://localhost:5000/api/bookings', {
        movieId,
        seatCount,
        selectedSeats,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        alert('Booking successful!');
        navigate('/show-tickets'); // Redirect to profile page to show booking
      }).catch(error => {
        console.error("Error booking tickets:", error);
      });
    }
  };

  return (
    <div className="ticket-booking-container">
      {loading ? (
        <p>Loading movie details...</p>
      ) : (
        <>
          <div className="movie-details">
            <img className="movie-poster" src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </div>

          <div className="seat-selection">
            <h3>Select Seats</h3>

            <div className="screen">SCREEN</div> {/* Display screen at the front of the seats */}

            <div className="row-labels">
              {/* Row labels (A-J) */}
              {['A', 'B', 'C', 'D'].map((rowLabel) => (
                <div key={rowLabel} className="row-label">{rowLabel}</div>
              ))}
            </div>

            <div className="seat-grid">
              {seats.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                  {row.map((seat, seatIndex) => (
                    <div
                      key={seatIndex}
                      className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''} ${reservedSeats.includes(seat) ? 'reserved' : ''}`}
                      onClick={() => handleSeatSelect(seat)}
                      style={{ cursor: reservedSeats.includes(seat) ? 'not-allowed' : 'pointer' }}
                    >
                      {seat}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p>Seats Selected: {seatCount}</p>
            <button className="book-btn" onClick={handleBooking} disabled={seatCount === 0}>
              Book Tickets
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketBooking;
