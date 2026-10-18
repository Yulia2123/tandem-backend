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
//logout
authRouter.post("/refresh", ctrl.refreshUserSession);
authRouter.post('/logout', ctrl.logoutUser);

export default authRouter;
