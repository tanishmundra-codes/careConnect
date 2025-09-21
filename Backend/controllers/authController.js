import User from "../models/user.js";
import Counselor from "../models/counsellor.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { email, phone, dateOfBirth, institution, password, role } = req.body;

  if (!email || !phone || !dateOfBirth || !institution || !password) {
    return res.status(400).json({ message: "Please fill out all required fields." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, phone, dateOfBirth, institution, password, role });
    
    res.status(201).json({ _id: user._id, email: user.email, role: user.role, token: generateToken(user._id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

export const counselorSignup = async (req, res) => {
  const { email, phone, dateOfBirth, institution, password, name, specialization, experience } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    
    const user = await User.create({
      email,
      phone,
      dateOfBirth,
      institution,
      password,
      role: 'counselor',
    });

    const counselor = await Counselor.create({
      userId: user._id,
      name,
      specialization,
      experience,
    });
    
    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      counselorId: counselor._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during counselor signup" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, email: user.email, role: user.role, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};