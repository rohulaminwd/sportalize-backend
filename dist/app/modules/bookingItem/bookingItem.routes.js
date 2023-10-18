"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookingItem_controller_1 = require("./bookingItem.controller");
const bookingItem_validation_1 = require("./bookingItem.validation");
const router = express_1.default.Router();
router.get('/', bookingItem_controller_1.BookingItemController.getAllBookingItems);
router.get('/:id', bookingItem_controller_1.BookingItemController.getBookingItemById);
router.post('/create', 
// auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
// validateRequest(BookValidation.createBookZodSchema),
bookingItem_controller_1.BookingItemController.createBookingItem);
router.patch('/:id', 
// auth(ENUM_USER_ROLE.ADMIN),
(0, validateRequest_1.default)(bookingItem_validation_1.BookValidation.updateBookZodSchema), bookingItem_controller_1.BookingItemController.updateBookingItem);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), bookingItem_controller_1.BookingItemController.deleteBookingItem);
exports.BookingItemRoutes = router;
