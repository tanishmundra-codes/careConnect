// routes/authRoutes.js

import express from 'express';
import { registerUser, loginUser, counselorSignup } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/counselor-signup', counselorSignup);

export default router;