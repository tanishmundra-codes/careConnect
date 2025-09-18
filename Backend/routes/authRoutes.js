import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Register new user
router.post("/signup", registerUser);

// Login user
router.post("/login", loginUser);

export default router;
