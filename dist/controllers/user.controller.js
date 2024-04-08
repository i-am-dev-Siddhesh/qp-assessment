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
exports.getAllGroceryItems = exports.bookGroceryItems = exports.userLoginApi = exports.userMeApi = void 0;
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("../clients/prisma");
const messages_1 = require("../constants/messages");
const auth_1 = require("../utils/auth");
const errorResponse_1 = require("../utils/errorResponse");
// @desc    GET User
// @route   GET /v1/auth/user/me
// @access  Protected
const userMeApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user && req.user.password) {
            // @ts-ignore
            delete req.user.password;
        }
        return res.status(200).json({ status: true, data: req.user });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userMeApi = userMeApi;
// @desc    Login user
// @route   POST /v1/auth/user/login
// @access  Public
const userLoginApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw {
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const isValid = yield argon2_1.default.verify(user === null || user === void 0 ? void 0 : user.password, password);
        if (!isValid) {
            throw {
                status_code: 404,
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const token = (0, auth_1.createJWTToken)({
            id: user.id,
            email: user === null || user === void 0 ? void 0 : user.email,
        }, 'user');
        res.cookie('val', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.DOMAIN,
        });
        delete user.password;
        return res.status(200).json({ status: true, data: user });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.userLoginApi = userLoginApi;
// @desc    Book grocery items
// @route   Post /v1/user/grocery/book
// @access  Protected
const bookGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = req.body;
        const userId = Number(req.user.id);
        const bookedItems = yield Promise.all(items.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const { groceryItemId, quantity } = item;
            return prisma_1.prisma.bookedItem.create({
                data: {
                    quantity: quantity,
                    bookedBy: userId,
                    groceryItemId: groceryItemId,
                },
            });
        })));
        res.status(201).json(bookedItems);
        return;
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.bookGroceryItems = bookGroceryItems;
// @desc    Get all grocery items
// @route   GET /v1/user/grocery
// @access  Protected
const getAllGroceryItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryItems = yield prisma_1.prisma.groceryItem.findMany();
        return res.status(200).json(groceryItems);
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.getAllGroceryItems = getAllGroceryItems;
