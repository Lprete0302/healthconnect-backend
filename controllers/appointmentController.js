const Appointment = require('../models/Appointment');

// ✅ Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctor, date, time, reason } = req.body;

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor,
      date,
      time,
      reason
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get user's appointments
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: req.user.id }, { doctor: req.user.id }]
    })
      .populate('doctor', 'name email')
      .populate('patient', 'name email');

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment updated', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Export
module.exports = {
  bookAppointment,
  getAllAppointments,
  getMyAppointments,
  updateAppointmentStatus
};
