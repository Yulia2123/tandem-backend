import { Router } from "express";
import { celebrate } from "celebrate";

import { registerUserSchema } from "../validations/authValidation.js";
import { auth as ctrl } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", celebrate(registerUserSchema), ctrl.registerUser);

export default authRouter;
