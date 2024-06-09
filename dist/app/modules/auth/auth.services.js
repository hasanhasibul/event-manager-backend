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
exports.authServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../user/user.model"));
const getRefreshTokenServices = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    let isValidToken = null;
    try {
        isValidToken = jsonwebtoken_1.default.verify(refreshToken, "secret");
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "unthorized");
    }
    const { id, role } = isValidToken;
    const isUserExit = yield user_model_1.default.findById(id);
    if (!isUserExit) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "unthorized user not found");
    }
    //generate new access token
    const newAccesstoken = jsonwebtoken_1.default.sign({ id: id, role: role }, "secret", {
        expiresIn: "1h",
    });
    return {
        accessToken: newAccesstoken,
    };
});
const loginUserService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const rawPassword = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.password;
    const user = yield user_model_1.default.findOne({
        phoneNumber: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.phoneNumber,
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "user not exist");
    }
    const data = {
        role: user === null || user === void 0 ? void 0 : user.role,
        id: user === null || user === void 0 ? void 0 : user._id,
    };
    const hashPassword = (user === null || user === void 0 ? void 0 : user.password) || "";
    const isPasswordMatch = yield bcrypt_1.default.compare(rawPassword, hashPassword);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "password  not match");
    }
    const accessToken = jsonwebtoken_2.default.sign(data, "secret", { expiresIn: "1h" });
    const refreshToken = jsonwebtoken_2.default.sign(data, "secret", { expiresIn: "48h" });
    return {
        accessToken,
        refreshToken,
    };
});
const updatePasswordService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    // check user is exit or not
    const isUserExit = yield user_model_1.default.findOne({ _id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id });
    if (!isUserExit) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "user not exist");
    }
    // check old password is correct or not
    const isPasswordMatch = yield bcrypt_1.default.compare(oldPassword, isUserExit.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Old password  not match");
    }
    // if old password is correct then hash the new password
    const newHashPass = yield bcrypt_1.default.hash(newPassword, 12);
    // finally update the password
    yield user_model_1.default.findOneAndUpdate({ _id: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id }, { password: newHashPass, passwordUpdatedAt: new Date() });
});
exports.authServices = {
    getRefreshTokenServices,
    loginUserService,
    updatePasswordService,
};
