import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import assessementRoutes from "./models/assessement.js";
dotenv.config();
connectDB();

const app = express();

// Parse JSON requests
app.use(express.json());

// CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:3000", // React app
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
