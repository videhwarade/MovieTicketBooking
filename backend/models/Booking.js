const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  seatCount: {
    type: Number,
    required: true,
  },
  selectedSeats: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
