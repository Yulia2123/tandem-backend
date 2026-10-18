import { authenticate } from "../middleware/authenticate.js";
import { Router } from "express";
import { users } from "../controllers/index.js";

const userRouter = Router();

userRouter.get(
  "/me/saved-stories",
  authenticate,
  users.getSavedStories,
);

export default userRouter;
