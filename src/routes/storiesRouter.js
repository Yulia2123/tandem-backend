import { Router } from "express";

const storiesRouter = Router();

import { stories as ctrl } from "../controllers/index.js";

storiesRouter.get("/:storyId", ctrl.getStoryById);

export default storiesRouter;
