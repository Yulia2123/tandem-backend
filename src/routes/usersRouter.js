import { Router } from "express";
import { celebrate } from "celebrate";

import { authenticate } from "../middleware/authenticate.js";
import { users as ctrl } from "../controllers/index.js";
import { getCurrentUserStoriesValidationSchema } from "../validations/usersValidation.js";

const userRouter = Router();

userRouter.get(
  "/me/stories",
  authenticate,
  celebrate(getCurrentUserStoriesValidationSchema),
  ctrl.getCurrentUserStories
);

export default userRouter;
