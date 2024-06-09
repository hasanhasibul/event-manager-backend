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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllrs = void 0;
const auth_services_1 = require("./auth.services");
const http_status_codes_1 = require("http-status-codes");
const refreshTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const data = yield auth_services_1.authServices.getRefreshTokenServices(refreshToken);
        res.send({
            success: true,
            statusCode: 200,
            message: "New access token generated successfully !",
            data: {
                accessToken: data === null || data === void 0 ? void 0 : data.accessToken,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
const userLoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = yield auth_services_1.authServices.loginUserService(req), { refreshToken } = _a, others = __rest(_a, ["refreshToken"]);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: false,
            secure: false,
        });
        res.send({
            success: true,
            statusCode: 200,
            message: "user login successfully",
            data: others,
        });
    }
    catch (error) {
        next(error);
    }
});
const updatePasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield auth_services_1.authServices.updatePasswordService(req);
        res.send({
            status: http_status_codes_1.StatusCodes.OK,
            message: "Password updated succesfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.authControllrs = {
    refreshTokenController,
    userLoginController,
    updatePasswordController,
};
