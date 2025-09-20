import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // In a full application, these would link to actual User and Counselor documents
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  counselorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Counselor', // Reference to the Counselor model
    required: true,
  },
  date: {
    type: Date,
    required: [true, 'A date and time for the session is required.'],
  },
  topic: {
    type: String,
    required: [true, 'A topic or reason for the session is required.'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  sessionType: {
    type: String,
    enum: ['in-person', 'video-call', 'phone-call'],
    required: true,
  },
  urgency: {
    type: String,
    enum: ['routine', 'high', 'urgent'],
    required: true,
  },
  // Optional field from the textarea in the frontend
  additionalDetails: {
    type: String,
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
