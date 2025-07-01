const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const User = require('../models/userModel'); // ✅ updated import

// Test route
router.get('/test', userController.testUser);

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Protected dashboard route
router.get('/dashboard', auth, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, access granted.` });
});

// ✅ Corrected profile route
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
