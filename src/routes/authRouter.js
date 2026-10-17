import { Router } from "express";
import { celebrate } from "celebrate";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validations/authValidation.js";
import { auth as ctrl } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", celebrate(registerUserSchema), ctrl.registerUser);
authRouter.post("/login", celebrate(loginUserSchema), ctrl.loginUser);

export default authRouter;
