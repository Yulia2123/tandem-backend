
import { Router } from "express";
import { celebrate } from "celebrate";

import { authenticate } from "../middleware/authenticate.js";
import { users } from "../controllers/index.js";
import { getCurrentUserStoriesValidationSchema } from "../validations/usersValidation.js";

const userRouter = Router();

userRouter.get(
  "/me/saved-stories",
  authenticate,
  users.getSavedStories
);

userRouter.get(
  "/me/stories",
  authenticate,
  celebrate(getCurrentUserStoriesValidationSchema),
  users.getCurrentUserStories
);

export default userRouter;
