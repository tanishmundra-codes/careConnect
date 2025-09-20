import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema],
});

const assessmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // student who took test
    type: {
      type: String,
      enum: ["Depression", "Anxiety", "Stress"],
      required: true,
    },
    name: { type: String, required: true }, // e.g. PHQ-9, GAD-7
    description: { type: String },
    duration: { type: String }, // "3-5 minutes"
    questions: [questionSchema],
    answers: {
      type: Map,
      of: Number, // { 0: 2, 1: 3 } -> questionIndex: answerValue
    },
    score: { type: Number, default: 0 },
    maxScore: { type: Number },
    severity: { type: String }, // e.g. Mild, Moderate, Severe
    recommendation: { type: String },
    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "crisis"],
    },
    percentage: { type: Number },
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
