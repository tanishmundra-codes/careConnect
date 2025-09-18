import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  studentId: {
    type: String, // UUID of student
    required: true,
  },
  counselorId: {
    type: String, // UUID or ID of counselor
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  sessionType: {
    type: String,
    enum: ["in-person", "video-call", "phone-call"],
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    enum: ["routine", "high", "urgent"],
    default: "routine",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
