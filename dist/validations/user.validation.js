"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookGroceryItemValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookGroceryItemValidation = joi_1.default.array().items(joi_1.default.object().keys({
    groceryItemId: joi_1.default.number().required().messages({
        'number.base': `Grocery Id should be a type of number`,
        'number.empty': `Grocery Id cannot be an empty field`,
        'any.required': `Grocery Id is a required field`,
    }),
    quantity: joi_1.default.number().required().messages({
        'number.base': `Price should be a type of number`,
        'number.empty': `Price cannot be an empty field`,
        'any.required': `Price is a required field`,
    }),
}));
