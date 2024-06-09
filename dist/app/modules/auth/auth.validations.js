"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordZodSchema =
  exports.authTokeZodSchema =
  exports.useLoginZodSchema =
    void 0;
const zod_1 = __importDefault(require("zod"));
exports.useLoginZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    phoneNumber: zod_1.default.string({
      required_error: "Phone Number is required",
    }),
    password: zod_1.default.string({
      required_error: "password is required",
    }),
  }),
});
exports.authTokeZodSchema = zod_1.default.object({
  headers: zod_1.default.object({
    Authorization: zod_1.default.string({
      required_error: "Access token is missing",
    }),
  }),
});
exports.updatePasswordZodSchema = zod_1.default.object({
  body: zod_1.default.object({
    oldPassword: zod_1.default.string({
      required_error: "Old password is required",
    }),
    newPassword: zod_1.default.string({
      required_error: "New password is required",
    }),
  }),
});
