import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import counselorRoutes from './routes/counsellor.js';
import peerSupportRoutes from './routes/p2pRoutes.js';

// --- Basic Setup ---
dotenv.config();
connectDB();
const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/counselors', counselorRoutes);
app.use('/api/meetings', bookingRoutes);
app.use('/api', peerSupportRoutes);

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));