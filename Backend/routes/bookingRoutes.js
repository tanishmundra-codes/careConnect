import express from 'express';
import bookingController from '../controllers/bookingController.js';

const router = express.Router();

// Note: In a real app with JWT, you would add authentication middleware here
// import { protect } from '../middleware/authMiddleware.js';
// router.use(protect);

// POST /api/meetings - Create a new booking
router.post('/', bookingController.createBooking);

// GET /api/meetings - Get all bookings
router.get('/', bookingController.getAllBookings);

export default router;
