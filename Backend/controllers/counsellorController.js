import Counselor from "../models/counsellor.js";

// @desc Get all counselors
// @route GET /api/counselors
export const getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find({});
    res.json(counselors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching counselors", error });
  }
};

// @desc Add a new counselor
// @route POST /api/counselors
export const addCounselor = async (req, res) => {
  try {
    const counselor = new Counselor(req.body);
    const savedCounselor = await counselor.save();
    res.status(201).json(savedCounselor);
  } catch (error) {
    res.status(400).json({ message: "Error adding counselor", error });
  }
};

// @desc Get a counselor by ID
// @route GET /api/counselors/:id
export const getCounselorById = async (req, res) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    res.json(counselor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching counselor", error });
  }
};
