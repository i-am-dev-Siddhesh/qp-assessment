"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.createRefreshToken = exports.decodeJWTToken = exports.createJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const createJWTToken = (data, type) => {
    const token = jsonwebtoken_1.default.sign(data, type === 'admin'
        ? process.env.JWT_ADMIN_TOKEN_SECRET
        : process.env.JWT_TOKEN_SECRET, {
        expiresIn: constants_1.refreshTokenExp,
    });
    return { token, expirationTime: Date.now() + constants_1.refreshTokenExp };
};
exports.createJWTToken = createJWTToken;
const decodeJWTToken = (data, type) => {
    const token = jsonwebtoken_1.default.verify(data, type === 'admin'
        ? process.env.JWT_ADMIN_TOKEN_SECRET
        : process.env.JWT_TOKEN_SECRET);
    return token;
};
exports.decodeJWTToken = decodeJWTToken;
const createRefreshToken = (data) => {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: constants_1.refreshTokenExp,
    });
    return token;
};
exports.createRefreshToken = createRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        return user;
    }
    catch (err) {
        throw err;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
