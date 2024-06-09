import express from "express";
import { authControllrs } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { useLoginZodSchema } from "./auth.validations";

const router = express.Router();

router.post(
  "/login",
  validateRequest(useLoginZodSchema),
  authControllrs.userLoginController
);

const authRouter = router;

export default authRouter;
