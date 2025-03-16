const express = require('express');
const { bookTicket, getUserBookings , getReservedSeats} = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, bookTicket);
router.get('/show-tickets', authMiddleware, getUserBookings);
// Add the new route to get reserved seats for a movie
router.get('/reserved-seats/:movieId', authMiddleware, getReservedSeats);
module.exports = router;
