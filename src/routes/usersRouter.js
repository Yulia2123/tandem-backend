
import { Router } from "express";
import { users } from "../controllers/index.js";

const userRouter = Router();

userRouter.get("/me/saved-stories", users.getSavedStories);

export default userRouter;
