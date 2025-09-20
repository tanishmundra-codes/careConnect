import Booking from '../models/booking.js';
// In a real app, you might import User and Counselor models to validate IDs
// import User from '../models/userModel.js';
// import Counselor from '../models/counselorModel.js';

/**
 * @desc    Create a new booking
 * @route   POST /api/meetings
 * @access  Private (for authenticated students)
 */
const createBooking = async (req, res) => {
  try {
    const { studentId, counselorId, date, topic, sessionType, urgency, additionalDetails } = req.body;

    // Basic validation
    if (!studentId || !counselorId || !date || !topic || !sessionType || !urgency) {
      return res.status(400).json({ success: false, message: 'Please provide all required booking fields.' });
    }

    // NOTE: In a real application, you would add more validation here:
    // 1. Verify that `studentId` matches the logged-in user.
    // 2. Check if the `counselorId` is a valid counselor.
    // 3. Ensure the requested `date` slot is actually available.

    const newBooking = new Booking({
      studentId,
      counselorId,
      date: new Date(date), // Convert string date from frontend into a Date object
      topic,
      sessionType,
      urgency,
      additionalDetails,
      status: 'pending', // Default status
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully. Awaiting confirmation.',
      data: savedBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error while creating booking.' });
  }
};

/**
 * @desc    Get all bookings (e.g., for an admin or a user's own bookings)
 * @route   GET /api/meetings
 * @access  Private
 */
const getAllBookings = async (req, res) => {
  try {
    // In a real app, you'd filter by user: const filter = { studentId: req.user.id };
    const bookings = await Booking.find({})
      .populate('studentId', 'name email') // Example: Populate student's name and email
      .populate('counselorId', 'name specialization') // Example: Populate counselor's name
      .sort({ date: -1 }); // Sort by most recent date first

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching bookings.' });
  }
};

const bookingController = {
  createBooking,
  getAllBookings,
};

export default bookingController;
