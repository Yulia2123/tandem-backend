import { Router } from "express";
import { celebrate } from "celebrate";
import { authenticate } from "../middleware/authenticate.js";
import { users as ctrl } from "../controllers/index.js";
import { getStoryIdValidationSchema } from "../validations/storiesValidation.js";
import {
  getCurrentUserStoriesValidationSchema,
  getUserProfileValidationSchema,
} from "../validations/usersValidation.js";

const userRouter = Router();

userRouter.get("/me", authenticate, ctrl.getCurrentUser);

userRouter.get(
  "/me/stories",
  authenticate,
  celebrate(getCurrentUserStoriesValidationSchema),
  ctrl.getCurrentUserStories
);

userRouter.get("/me/saved-stories", authenticate, ctrl.getSavedStories);

userRouter.post("/me/saved-stories/:storyId", authenticate, ctrl.saveStory);

userRouter.delete(
  "/me/saved-stories/:storyId",
  authenticate,
  celebrate(getStoryIdValidationSchema),
  ctrl.removeSavedStory
);

userRouter.get("/", ctrl.getTravellers);

userRouter.get(
  "/:userId",
  celebrate(getUserProfileValidationSchema),
  ctrl.getUserProfile
);

export default userRouter;
