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
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.create({
        data,
    });
    return result;
});
const getAllFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findMany({});
    return result;
});
const getFeedbackById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Category Doesn't Exists");
    }
    return result;
});
const updateFeedback = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.update({
        where: { id },
        data,
    });
    return result;
});
const deleteFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.CategoryService = {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
