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
exports.deleteGroceryItem = exports.updateGroceryItem = exports.getGroceryItemById = exports.getAllGroceryItems = exports.addGroceryItem = exports.adminLoginApi = exports.adminMeApi = void 0;
const argon2_1 = __importDefault(require("argon2"));
const prisma_1 = require("../clients/prisma");
const messages_1 = require("../constants/messages");
const auth_1 = require("../utils/auth");
const errorResponse_1 = require("../utils/errorResponse");
// @desc    GET Admin
// @route   GET /v1/auth/admin/me
// @access  Protected
const adminMeApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.admin && req.admin.password) {
            // @ts-ignore
            delete req.admin.password;
        }
        return res.status(200).json({ status: true, data: req.admin });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.adminMeApi = adminMeApi;
// @desc    login admin
// @route   POST /v1/auth/admin/login
// @access  Public
const adminLoginApi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let admin = yield prisma_1.prisma.admin.findUnique({
            where: {
                email,
            },
        });
        if (!admin) {
            throw {
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const isValid = yield argon2_1.default.verify(admin === null || admin === void 0 ? void 0 : admin.password, password);
        if (!isValid) {
            throw {
                status_code: 404,
                message: messages_1.EMAIL_PASSWORD_INVALID,
            };
        }
        const token = (0, auth_1.createJWTToken)({
            id: admin.id,
            email: admin === null || admin === void 0 ? void 0 : admin.email,
        }, 'admin');
        res.cookie('val', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            domain: process.env.DOMAIN,
        });
        delete admin.password;
        return res.status(200).json({ status: true, data: admin });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.adminLoginApi = adminLoginApi;
// @desc    Add grocery item
// @route   Post /v1/admin/grocery/add
// @access  Protected
const addGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, inventory } = req.body;
        const addedBy = Number(req.admin.id);
        const newItem = yield prisma_1.prisma.groceryItem.create({
            data: {
                name,
                price,
                inventory,
                addedBy,
            },
        });
        return res.status(201).json(newItem);
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.addGroceryItem = addGroceryItem;
// @desc    Get all grocery items
// @route   GET /v1/admin/grocery
// @access  Protected
const getAllGroceryItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryItems = yield prisma_1.prisma.groceryItem.findMany();
        return res.status(200).json(groceryItems);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllGroceryItems = getAllGroceryItems;
// @desc    Get a single grocery item by ID
// @route   GET /v1/admin/grocery/:id
// @access  Protected
const getGroceryItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const groceryItem = yield prisma_1.prisma.groceryItem.findUnique({
            where: { id: parseInt(id) },
        });
        if (!groceryItem) {
            return res.status(404).json({ error: 'Grocery item not found' });
        }
        return res.status(200).json(groceryItem);
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.getGroceryItemById = getGroceryItemById;
// @desc    Update a grocery item
// @route   PUT /v1/admin/grocery/:id
// @access  Protected
const updateGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, price, inventory } = req.body;
        const updatedItem = yield prisma_1.prisma.groceryItem.update({
            where: { id: parseInt(id) },
            data: { name, price, inventory },
        });
        return res.status(200).json(updatedItem);
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.updateGroceryItem = updateGroceryItem;
// @desc    Delete a grocery item
// @route   DELETE /v1/admin/grocery/:id
// @access  Protected
const deleteGroceryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.prisma.groceryItem.delete({
            where: { id: parseInt(id) },
        });
        return res
            .status(200)
            .json({ message: 'Grocery item deleted successfully' });
    }
    catch (error) {
        return res.status((0, errorResponse_1.generalErrorStatusCode)(error)).json((0, errorResponse_1.generalError)(error));
    }
});
exports.deleteGroceryItem = deleteGroceryItem;
