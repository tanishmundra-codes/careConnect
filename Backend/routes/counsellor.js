import express from 'express';
import counselorController from '../controllers/counsellorController.js';

const router = express.Router();

// When a GET request is made to the root of this route ('/'),
// which corresponds to '/api/counselors' in your server.js,
// it will be handled by the getAllCounselors function from the controller.
router.get('/', counselorController.getAllCounselors);

export default router;

