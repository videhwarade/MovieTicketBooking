const express = require('express');
const { signUp, signIn, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', authMiddleware, getProfile); // Keep only the get profile route

module.exports = router;
