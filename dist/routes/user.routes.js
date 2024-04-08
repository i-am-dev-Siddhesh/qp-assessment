"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const admin_controller_1 = require("../controllers/admin.controller");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const auth_2 = require("../validations/auth");
const user_validation_1 = require("../validations/user.validation");
const router = express_1.default.Router({ mergeParams: true });
router.route('/auth/me').get(auth_1.checkApiKey, auth_1.checkUserToken, user_controller_1.userMeApi);
router
    .route('/auth/login')
    .post(auth_1.checkApiKey, (0, validate_1.validate)(auth_2.loginSchema), user_controller_1.userLoginApi);
router
    .route('/grocery')
    .post(auth_1.checkApiKey, auth_1.checkUserToken, (0, validate_1.validate)(user_validation_1.bookGroceryItemValidation), user_controller_1.bookGroceryItems)
    .get(auth_1.checkApiKey, auth_1.checkUserToken, admin_controller_1.getAllGroceryItems);
exports.default = router;
