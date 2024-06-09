import { RequestHandler } from "express";
import { authServices } from "./auth.services";

const userLoginController: RequestHandler = async (req, res, next) => {
  try {
    const { accessToken, name, user_id } = await authServices.loginUserService(
      req
    );

    res.send({
      success: true,
      statusCode: 200,
      message: "user login successfully",
      data: { accessToken, name, user_id },
    });
  } catch (error) {
    next(error);
  }
};

export const authControllrs = {
  userLoginController,
};
