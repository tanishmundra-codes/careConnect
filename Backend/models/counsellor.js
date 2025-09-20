import mongoose from 'mongoose';

const counselorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String },
  rating: { type: Number },
  availability: { type: String },
  image: { type: String },
});

const Counselor = mongoose.model('Counselor', counselorSchema);

export default Counselor;
