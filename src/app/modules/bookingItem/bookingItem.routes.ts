import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookingItemController } from './bookingItem.controller';
import { BookValidation } from './bookingItem.validation';

const router = express.Router();

router.get('/', BookingItemController.getAllBookingItems);
router.get('/:id', BookingItemController.getBookingItemById);

router.post(
  '/create',
  // auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  // validateRequest(BookValidation.createBookZodSchema),
  BookingItemController.createBookingItem
);

router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookZodSchema),
  BookingItemController.updateBookingItem
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingItemController.deleteBookingItem
);

export const BookingItemRoutes = router;
