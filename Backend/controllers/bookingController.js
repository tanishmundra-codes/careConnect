import Booking from '../models/booking.js';
import Counselor from '../models/counsellor.js';
import User from '../models/user.js';

// Student creates a new booking
export const createBooking = async (req, res) => {
  try {
    const { studentId, counselorId, topic, date, sessionType, urgency } = req.body;
    const newBooking = new Booking({
      studentId,
      counselorId,
      topic,
      date,
      sessionType,
      urgency,
      status: 'Pending',
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Booking failed', error: error.message });
  }
};

// Get a user's specific bookings
export const getMyBookings = async (req, res) => {
  try {
    const { _id, role } = req.user;
    let bookings;

    if (role === 'student') {
      bookings = await Booking.find({ studentId: _id }).populate('counselorId', 'name image specialization');
    } else if (role === 'counselor') {
      // ❗ This is the fix for counselors ❗
      // First, find the Counselor document using the User's ID
      const counselorProfile = await Counselor.findOne({ userId: _id });

      if (!counselorProfile) {
        return res.status(404).json({ message: 'Counselor profile not found' });
      }

      // Then, use the Counselor profile's _id to find the bookings
      bookings = await Booking.find({ counselorId: counselorProfile._id }).populate('studentId', 'email institution');
    } else {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};

// Counselor updates booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const { _id: userId } = req.user;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Find the counselor profile linked to the logged-in user
    const counselorProfile = await Counselor.findOne({ userId });

    if (!counselorProfile || booking.counselorId.toString() !== counselorProfile._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You are not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status', error: error.message });
  }
};

// ... (Add other controller functions here)