import Counselor from "../models/counsellor.js";

export const getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find();
    res.status(200).json(counselors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch counselors' });
  }
};
