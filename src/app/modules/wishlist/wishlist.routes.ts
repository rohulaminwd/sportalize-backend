import express from 'express';
import { ReviewController } from './wishlist.controller';

const router = express.Router();

router.get('/', ReviewController.getWishlistFromDB);

router.get(
  '/:id',

  ReviewController.getSingleWishlist
);

router.post('/create', ReviewController.createWishlist);

router.patch('/:id', ReviewController.updateWishlistDataToDB);
router.delete('/:id', ReviewController.deleteWishlistFromDB);

export const WishlistRoutes = router;
