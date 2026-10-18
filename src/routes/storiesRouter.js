import { Router } from "express";
import { getAllStories } from "../controllers/stories/getStories.js";
import { celebrate } from "celebrate";
import { getAllStoriesValidationSchema } from "../validations/storiesValidation.js";
import { stories as ctrl } from "../controllers/index.js";

const storiesRouter = Router();

storiesRouter.get("/:storyId", ctrl.getStoryById);
storiesRouter.get('/api/stories',celebrate(getAllStoriesValidationSchema), getAllStories)
export default storiesRouter;
