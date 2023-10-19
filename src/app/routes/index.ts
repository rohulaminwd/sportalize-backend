import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BookingItemRoutes } from '../modules/bookingItem/bookingItem.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { ProfileRoutes } from '../modules/user/user.profile';
import { userRoutes } from '../modules/user/user.routes';
import { WishlistRoutes } from '../modules/wishlist/wishlist.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/bookingItems',
    route: BookingItemRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/bookings',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
