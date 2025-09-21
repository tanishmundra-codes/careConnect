// routes/bookingRoutes.js

import express from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js'; // ❗ Ensure you have the correct path to your middleware

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/status/:bookingId', protect, updateBookingStatus);

export default router;