import express from "express";
import { saveAssessment, getMyAssessments, getStudentAssessments } from "../controllers/assessmentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Student saves an assessment attempt
router.post("/", protect, authorizeRoles("student"), saveAssessment);

// Student views their past assessments
router.get("/my", protect, authorizeRoles("student"), getMyAssessments);

// Counselor/Admin views specific student's assessments
router.get("/:studentId", protect, authorizeRoles("counselor", "admin"), getStudentAssessments);

export default router;