import express from "express";
import { getCounselors, addCounselor, getCounselorById } from "../controllers/counsellorController.js";

const router = express.Router();

router.get("/", getCounselors);
router.post("/", addCounselor);
router.get("/:id", getCounselorById);

export default router;
