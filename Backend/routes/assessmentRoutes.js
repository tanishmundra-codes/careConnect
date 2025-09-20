// routes.js

import express from 'express';
// FIX: Changed the path to start with './'
import assessmentController from '../controllers/assessmentController.js';

const router = express.Router();

// Route to create a new assessment result
// POST /
router.post('/', assessmentController.createAssessment);

// Route to get all assessment results
// GET /
router.get('/', assessmentController.getAllAssessments);

export default router;