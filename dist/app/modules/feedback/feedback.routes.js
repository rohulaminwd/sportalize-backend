"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const router = express_1.default.Router();
router.get('/', feedback_controller_1.CategoryController.getAllFeedback);
router.get('/:id', feedback_controller_1.CategoryController.getFeedbackById);
router.post('/create', feedback_controller_1.CategoryController.createFeedback);
router.patch('/:id', feedback_controller_1.CategoryController.updateFeedback);
router.delete('/:id', feedback_controller_1.CategoryController.deleteFeedback);
exports.FeedbackRoutes = router;
