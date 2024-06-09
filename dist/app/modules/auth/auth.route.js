"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validations_1 = require("./auth.validations");
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post("/refress-token", auth_controller_1.authControllrs.refreshTokenController);
router.post("/login", (0, validateRequest_1.default)(auth_validations_1.useLoginZodSchema), auth_controller_1.authControllrs.userLoginController);
router.post("/change-password", (0, validateRequest_1.default)(auth_validations_1.updatePasswordZodSchema), (0, authMiddleware_1.default)(["admin", "seller", "buyer"]), auth_controller_1.authControllrs.updatePasswordController);
const authRouter = router;
exports.default = authRouter;
