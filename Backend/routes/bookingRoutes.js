import express from "express";
import Booking from "../models/booking.js";

const router = express.Router();

// ✅ Create booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to book session" });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// ✅ Update booking status
router.put("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

export default router;
