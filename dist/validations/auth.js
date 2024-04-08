"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().messages({
        'string.base': `Email should be a type of string`,
        'string.empty': `Email cannot be an empty field`,
        'any.required': `Email is a required field`,
    }),
    password: joi_1.default.string().required().messages({
        'string.base': `Password should be a type of string`,
        'string.empty': `Password cannot be an empty field`,
        'any.required': `Password is a required field`,
    }),
});
