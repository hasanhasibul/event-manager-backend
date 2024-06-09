import ApiError from "../../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModal from "../user/user.model";
import { Request } from "express";

const loginUserService = async (req: Request) => {
  const rawPassword = req?.body?.password;
  const user = await userModal.findOne({
    phone: req?.body?.phone,
  });
  if (!user) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "user not exist");
  }
  const data = {
    id: user?._id,
  };
  const hashPassword = user?.password || "";

  const isPasswordMatch = await bcrypt.compare(rawPassword, hashPassword);

  if (!isPasswordMatch) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "phone or password  not match"
    );
  }
  const accessToken = jwt.sign(data, "secret", { expiresIn: "24h" });
  return {
    accessToken,
    user_id: user?._id,
    name: user?.name,
  };
};

export const authServices = {
  loginUserService,
};
