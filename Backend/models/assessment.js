// model.js

import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [mongoose.Schema.Types.Mixed], 
}, { _id: false });

const assessmentResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Assessment name is required.'],
  },
  type: {
    type: String,
    required: [true, 'Assessment type is required.'],
  },
  description: String,
  duration: String,
  questions: [questionSchema],
  answers: {
    type: Map,
    of: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  maxScore: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  severity: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
    required: true,
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'crisis'],
    required: true,
  },
}, {
  timestamps: true,
});

const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);

export default AssessmentResult;