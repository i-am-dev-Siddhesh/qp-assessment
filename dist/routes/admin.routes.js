"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const admin_controller_1 = require("../controllers/admin.controller");
const general_controller_1 = require("../controllers/general.controller");
const validate_1 = require("../middlewares/validate");
const admin_validation_1 = require("../validations/admin.validation");
const auth_2 = require("../validations/auth");
const router = express_1.default.Router({ mergeParams: true });
router.route('/').get(auth_1.checkApiKey, general_controller_1.checkServerHealth);
router.route('/auth/me').get(auth_1.checkApiKey, auth_1.checkAdminToken, admin_controller_1.adminMeApi);
router
    .route('/auth/login')
    .post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.loginSchema), admin_controller_1.adminLoginApi);
router
    .route('/grocery')
    .post(auth_1.checkApiKey, auth_1.checkAdminToken, (0, validate_1.validate)(admin_validation_1.addGroceryItemValidation), admin_controller_1.addGroceryItem)
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, admin_controller_1.getAllGroceryItems);
router
    .route('/grocery/:id')
    .get(auth_1.checkApiKey, auth_1.checkAdminToken, admin_controller_1.getGroceryItemById)
    .put(auth_1.checkApiKey, auth_1.checkAdminToken, (0, validate_1.validate)(admin_validation_1.updateGroceryItemValidation), admin_controller_1.updateGroceryItem)
    .delete(auth_1.checkApiKey, auth_1.checkAdminToken, admin_controller_1.deleteGroceryItem);
exports.default = router;
