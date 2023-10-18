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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const isPasswordMached_1 = require("../../../helpers/isPasswordMached");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
        },
    });
    if (isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User Already Exists!');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10); // You can adjust the number of rounds for hashing
    // Replace the plain text password with the hashed password
    const userData = Object.assign(Object.assign({}, payload), { password: hashedPassword });
    const result = yield prisma_1.default.user.create({
        data: userData,
    });
    return result;
});
// LOgin user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    if (isUserExist.password &&
        !(yield (0, isPasswordMached_1.isPasswordMatched)(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password do not matched');
    }
    //create access token and refresh token
    const { role, id: userId } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
// Change pass
const ChangePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exists');
    }
    if (isUserExist.password &&
        !(yield (0, isPasswordMached_1.isPasswordMatched)(payload === null || payload === void 0 ? void 0 : payload.currentPass, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is not matched');
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPass, 10);
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return result;
});
exports.authService = {
    signUp,
    loginUser,
    ChangePassword,
};
