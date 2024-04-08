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
exports.checkIpLocation = exports.checkUserToken = exports.checkToken = exports.checkAdminToken = exports.checkUserButStillAllowRoute = exports.checkApiKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../clients/prisma");
const auth_1 = require("../utils/auth");
const errorResponse_1 = require("../utils/errorResponse");
const checkApiKey = (req, res, next) => {
    var _a;
    try {
        const apiKey = process.env.API_KEY;
        if (!req.headers.apikey || ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.apikey) !== apiKey) {
            return res.status(403).json((0, errorResponse_1.forbiddenError)());
        }
        return next();
    }
    catch (error) {
        return res.status(500).json((0, errorResponse_1.generalError)(error));
    }
};
exports.checkApiKey = checkApiKey;
const checkUserButStillAllowRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (authorization || (authorization === null || authorization === void 0 ? void 0 : authorization.startsWith('Bearer '))) {
            const idToken = authorization.split('Bearer ')[1];
            const decoded = (0, auth_1.decodeJWTToken)(idToken, 'user');
            if (decoded) {
                const email = decoded === null || decoded === void 0 ? void 0 : decoded.email;
                const user = (yield prisma_1.prisma.user.findUnique({
                    where: {
                        email,
                    },
                    include: { bookedItems: true },
                }));
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
});
exports.checkUserButStillAllowRoute = checkUserButStillAllowRoute;
const checkAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = (_b = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.val) === null || _b === void 0 ? void 0 : _b.token;
        if (!token) {
            throw {
                message: 'Unauthorized',
            };
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ADMIN_TOKEN_SECRET);
        const admin = (yield prisma_1.prisma.admin.findUnique({
            where: {
                id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
            },
        }));
        if (!admin) {
            throw {
                status_code: 404,
                message: 'Admin not found',
            };
        }
        req.admin = admin;
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
    next();
});
exports.checkAdminToken = checkAdminToken;
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new Error('Unauthorized');
        }
        const idToken = authorization.split('Bearer ')[1];
        const decoded = (0, auth_1.decodeJWTToken)(idToken, 'user');
        const email = decoded === null || decoded === void 0 ? void 0 : decoded.email;
        const user = (yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        }));
        if (!user) {
            throw {
                message: 'User not found!!!',
            };
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
});
exports.checkToken = checkToken;
const checkUserToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const token = (_d = (_c = req === null || req === void 0 ? void 0 : req.cookies) === null || _c === void 0 ? void 0 : _c.val) === null || _d === void 0 ? void 0 : _d.token;
        if (!token) {
            throw {
                message: 'Unauthorized',
            };
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = (yield prisma_1.prisma.user.findUnique({
            where: {
                id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
            },
        }));
        if (!user) {
            throw {
                status_code: 404,
                message: 'User not found',
            };
        }
        req.user = user;
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
    next();
});
exports.checkUserToken = checkUserToken;
const checkIpLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipAddress = req.ip || req.connection.remoteAddress;
        // @ts-ignore
        req.ipAddress = ipAddress;
        next();
    }
    catch (error) {
        return res.status(401).json((0, errorResponse_1.forbiddenError)());
    }
});
exports.checkIpLocation = checkIpLocation;
