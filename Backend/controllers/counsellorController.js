import Counselor from '../models/counsellor.js';

/**
 * @desc    Get all counselors from the database
 * @route   GET /api/counselors
 * @access  Public (or Private if you want only logged-in users to see them)
 */
const getAllCounselors = async (req, res) => {
  try {
    // Find all documents in the Counselor collection
    const counselors = await Counselor.find({});
    
    res.status(200).json({
      success: true,
      count: counselors.length,
      data: counselors,
    });
  } catch (error) {
    console.error('Error fetching counselors:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching counselors.' });
  }
};

const counselorController = {
  getAllCounselors,
};

export default counselorController;

