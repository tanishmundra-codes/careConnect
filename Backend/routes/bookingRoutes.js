import express from "express";
import { createBooking, getAllBookings, getMyBookings, getMyCounselorBookings } from "../controllers/bookingController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Student creates a booking (must select counselor)
router.post("/", protect, authorizeRoles("student"), createBooking);

// Student views their own bookings
router.get("/my", protect, authorizeRoles("student"), getMyBookings);

// Counselor views only their assigned bookings
router.get("/counselor", protect, authorizeRoles("counselor"), getMyCounselorBookings);

// Admin views all bookings
router.get("/all", protect, authorizeRoles("admin"), getAllBookings);

export default router;
