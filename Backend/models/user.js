import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true }, 
  role: { type: String, enum: ["student", "counselor", "admin"], default: "student" },
  password: { type: String },
  specialization: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
