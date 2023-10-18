import express from 'express';

import { CategoryController } from './feedback.controller';

const router = express.Router();

router.get('/', CategoryController.getAllFeedback);
router.get('/:id', CategoryController.getFeedbackById);
router.post('/create', CategoryController.createFeedback);

router.patch('/:id', CategoryController.updateFeedback);

router.delete('/:id', CategoryController.deleteFeedback);

export const FeedbackRoutes = router;
