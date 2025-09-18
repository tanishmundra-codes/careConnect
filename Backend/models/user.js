const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    default: uuidv4, 
    required: true, 
    unique: true 
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  institution: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'counselor', 'admin'],
    default: 'student',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Middleware to hash password before saving a new user
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  
  // Generate a salt and hash the password
  const salt = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

