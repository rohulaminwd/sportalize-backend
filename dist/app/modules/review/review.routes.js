"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get('/', review_controller_1.ReviewController.getReviewsFromDB);
router.get('/:id', review_controller_1.ReviewController.getSingleReview);
router.post('/create', review_controller_1.ReviewController.createReview);
router.patch('/:id', review_controller_1.ReviewController.updateReviewDataToDB);
router.delete('/:id', review_controller_1.ReviewController.deleteReviewFromDB);
exports.reviewRoutes = router;
