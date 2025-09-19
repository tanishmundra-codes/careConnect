// Student makes a booking with selected counselor
export const createBooking = async (req, res) => {
  try {
    const { sessionType, date, time, topic, details, counselorId } = req.body;

    if (!counselorId) {
      return res.status(400).json({ message: "Counselor is required" });
    }

    const booking = await Booking.create({
      bookingId: uuidv4(),
      student: req.user._id,
      counselor: counselorId,  // assign selected counselor
      sessionType,
      date,
      time,
      topic,
      details
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Counselor fetches only their bookings
export const getMyCounselorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ counselor: req.user._id })
      .populate("student", "name email")
      .populate("counselor", "name email");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
