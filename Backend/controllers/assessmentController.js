// controller.js

import AssessmentResult from '../models/assessment.js';

const createAssessment = async (req, res) => {
  try {
    const newAssessment = new AssessmentResult(req.body);
    const savedAssessment = await newAssessment.save();
    
    res.status(201).json({
      success: true,
      message: 'Assessment result saved successfully.',
      data: savedAssessment,
    });
  } catch (error) {
    console.error('Error saving assessment:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error while saving assessment.' });
  }
};

const getAllAssessments = async (req, res) => {
  try {
    const assessments = await AssessmentResult.find({}).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments,
    });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching assessments.' });
  }
};

// Export all controller functions as a single default object
const assessmentController = {
  createAssessment,
  getAllAssessments,
};

export default assessmentController;