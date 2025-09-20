import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';

// --- Basic Setup ---
dotenv.config();
connectDB();
const app = express();

// --- Middleware ---
// 1. Enable CORS for your frontend application
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// 2. Enable JSON body parsing for API requests
app.use(express.json());

// --- API Routes ---
// Health check route to confirm the API is running
app.get('/', (req, res) => res.send('API is running...'));

// Mount the authentication routes under the /api/auth prefix
app.use('/api/auth', authRoutes);

// Mount the assessment routes under the /api/assessments prefix
app.use('/api/assessments', assessmentRoutes);


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));