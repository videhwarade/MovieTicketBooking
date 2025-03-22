const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

const bookTicket = async (req, res) => {
  const { movieId, seatCount, selectedSeats } = req.body;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const booking = new Booking({ user: req.user.id, movie: movieId, seatCount, selectedSeats });
    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getReservedSeats = async (req, res) => {
  const { movieId } = req.params;

  try {
    const bookings = await Booking.find({ movie: movieId }); // Find bookings for the given movie
    const reservedSeats = [];

    // Loop through the bookings and collect the selected seats
    bookings.forEach(booking => {
      reservedSeats.push(...booking.selectedSeats);
    });

    res.json({ reservedSeats });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add the cancelBooking function
const cancelBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookTicket, getUserBookings, getReservedSeats, cancelBooking };
