import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // 👈 import routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Allow frontend requests with cookies & credentials
app.use(
  cors({
    origin: "http://localhost:3000", // your React frontend
    credentials: true,              // allow cookies (if using JWT in cookies)
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Mount auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
