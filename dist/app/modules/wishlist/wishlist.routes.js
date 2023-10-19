"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.get('/', wishlist_controller_1.ReviewController.getWishlistFromDB);
router.get('/:id', wishlist_controller_1.ReviewController.getSingleWishlist);
router.post('/create', wishlist_controller_1.ReviewController.createWishlist);
router.patch('/:id', wishlist_controller_1.ReviewController.updateWishlistDataToDB);
router.delete('/:id', wishlist_controller_1.ReviewController.deleteWishlistFromDB);
exports.WishlistRoutes = router;
