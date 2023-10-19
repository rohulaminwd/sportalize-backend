import express from 'express';
import { ReviewController } from './review.controller';

const router = express.Router();

router.get('/', ReviewController.getReviewsFromDB);

router.get(
  '/:id',

  ReviewController.getSingleReview
);

router.post('/create', ReviewController.createReview);

router.patch('/:id', ReviewController.updateReviewDataToDB);
router.delete('/:id', ReviewController.deleteReviewFromDB);

export const reviewRoutes = router;
