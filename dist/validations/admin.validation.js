"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGroceryItemValidation = exports.addGroceryItemValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addGroceryItemValidation = joi_1.default.object().keys({
    name: joi_1.default.string().required().messages({
        'string.base': `Name should be a type of string`,
        'string.empty': `Name cannot be an empty field`,
        'any.required': `Name is a required field`,
    }),
    price: joi_1.default.number().required().messages({
        'number.base': `Price should be a type of number`,
        'number.empty': `Price cannot be an empty field`,
        'any.required': `Price is a required field`,
    }),
    inventory: joi_1.default.number().integer().required().messages({
        'number.base': `Inventory should be a type of integer`,
        'number.empty': `Inventory cannot be an empty field`,
        'number.integer': `Inventory should be an integer`,
        'any.required': `Inventory is a required field`,
    }),
});
exports.updateGroceryItemValidation = joi_1.default.object().keys({
    name: joi_1.default.string().messages({
        'string.base': `Name should be a type of string`,
        'string.empty': `Name cannot be an empty field`,
    }),
    price: joi_1.default.number().messages({
        'number.base': `Price should be a type of number`,
        'number.empty': `Price cannot be an empty field`,
    }),
    inventory: joi_1.default.number().integer().messages({
        'number.base': `Inventory should be a type of integer`,
        'number.empty': `Inventory cannot be an empty field`,
        'number.integer': `Inventory should be an integer`,
    }),
});
