import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },  // uuid
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // assigned later
  sessionType: { type: String, enum: ["In-Person", "Video Call", "Phone Call"], required: true },
  date: { type: String, required: true },  // dd-mm-yyyy
  time: { type: String, required: true },  // e.g. "10:00 AM"
  topic: { type: String, required: true },
  details: { type: String },
  status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
