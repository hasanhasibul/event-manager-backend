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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUserServices = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(reqBody);
    if (!user) {
        throw new Error('user creation fail');
    }
    return user;
});
const updateUserServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findByIdAndUpdate(id, req.body);
    if (!user) {
        throw new Error('user updated fail');
    }
    return user;
});
const getUserServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.find({});
    if (!user) {
        throw new Error('user retrieved fail');
    }
    return user;
});
const deleteUserServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findByIdAndDelete({ _id: id });
    if (!user) {
        throw new Error('user deleted fail');
    }
    return user;
});
const getUserByIdServices = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_model_1.default.findById({ _id: id });
    if (!user) {
        throw new Error('user find  fail');
    }
    return user;
});
exports.userServices = {
    createUserServices,
    getUserServices,
    deleteUserServices,
    getUserByIdServices,
    updateUserServices,
};
