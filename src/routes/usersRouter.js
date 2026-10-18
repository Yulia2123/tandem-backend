
import { Router } from "express";
import { users as ctrl } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

const userRouter = Router();

userRouter.get("/me/saved-stories", authenticate, ctrl.getSavedStories);

userRouter.post(
  "/me/saved-stories/:storyId",
  authenticate,
  ctrl.saveStory,
);

userRouter.delete(
  "/me/saved-stories/:storyId",
  authenticate,
  ctrl.removeSavedStory,
);

export default userRouter;
