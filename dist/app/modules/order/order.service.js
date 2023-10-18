"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookings.create({
        data: payload,
    });
    return result;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookings.findMany({
        include: {
            user: true,
            bookingItem: true,
        },
    });
    return result;
});
const getSingleOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookings.findUnique({
        where: {
            id: orderId,
        },
        include: {
            user: true,
            bookingItem: true,
        },
    });
    if (!result)
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookings.delete({
        where: {
            id,
        },
        include: {
            user: true,
            bookingItem: true,
        },
    });
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
    deleteOrder,
};
