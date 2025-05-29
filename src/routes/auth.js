const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/auth');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);

module.exports = router;
