const express = require('express');
const { bookTicket, getUserBookings, getReservedSeats, cancelBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, bookTicket);
router.get('/show-tickets', authMiddleware, getUserBookings);
// Add the new route to get reserved seats for a movie
router.get('/reserved-seats/:movieId', authMiddleware, getReservedSeats);
// Add the new route for cancelling a booking
router.delete('/cancel/:id', authMiddleware, cancelBooking);

module.exports = router;
