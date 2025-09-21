import express from 'express';
import { getCounselors } from '../controllers/counsellorController.js';

const router = express.Router();

router.get('/', getCounselors);

export default router;