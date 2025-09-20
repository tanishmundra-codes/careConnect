// p2pRoutes.js

import express from 'express';
import * as controller from '../controllers/p2pController.js';

const router = express.Router();

router.get('/discussions', controller.getAllDiscussions);
router.post('/discussions', controller.createDiscussion);
router.put('/discussions/:id/like', controller.likeDiscussion);
router.post('/discussions/:id/replies', controller.addReply);
router.get('/groups', controller.getAllSupportGroups);

export default router;