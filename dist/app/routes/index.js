"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const bookingItem_routes_1 = require("../modules/bookingItem/bookingItem.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const order_routes_1 = require("../modules/order/order.routes");
const review_routes_1 = require("../modules/review/review.routes");
const user_profile_1 = require("../modules/user/user.profile");
const user_routes_1 = require("../modules/user/user.routes");
const wishlist_routes_1 = require("../modules/wishlist/wishlist.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/bookingItems',
        route: bookingItem_routes_1.BookingItemRoutes,
    },
    {
        path: '/feedback',
        route: feedback_routes_1.FeedbackRoutes,
    },
    {
        path: '/bookings',
        route: order_routes_1.OrderRoutes,
    },
    {
        path: '/profile',
        route: user_profile_1.ProfileRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.reviewRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_routes_1.WishlistRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
