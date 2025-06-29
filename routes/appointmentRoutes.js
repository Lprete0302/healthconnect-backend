const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

const auth = require('../middleware/auth'); // ✅ Correct and consistent

// Routes
router.post('/', auth, bookAppointment);
router.get('/me', auth, getMyAppointments);
router.get('/', auth, getAllAppointments);
router.patch('/:id', auth, updateAppointmentStatus);

module.exports = router;
