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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const authMiddleware = (permissions) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || "";
        if (!token) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Unathorized");
        }
        const decoded = jsonwebtoken_1.default.verify(token, "secret");
        const isUserHave = yield user_model_1.default.findById({ _id: decoded === null || decoded === void 0 ? void 0 : decoded.id });
        if (!isUserHave) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Unathorized");
        }
        if (!permissions.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "access denied");
        }
        req.user = isUserHave;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = authMiddleware;
