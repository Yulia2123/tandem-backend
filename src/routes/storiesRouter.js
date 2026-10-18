import { Router } from "express";
import { getAllStories } from "../controllers/stories/getStories.js";
import { celebrate } from "celebrate";
import { getAllStoriesValidationSchema, getStoryIdValidationSchema } from "../validations/storiesValidation.js";
import { stories as ctrl } from "../controllers/index.js";

const storiesRouter = Router();

storiesRouter.get("/:storyId", celebrate(getStoryIdValidationSchema), ctrl.getStoryById);
storiesRouter.get("/:storyId/recommended", celebrate(getStoryIdValidationSchema), ctrl.getRecommendedStories);
storiesRouter.get('/api/stories',celebrate(getAllStoriesValidationSchema), getAllStories);
export default storiesRouter;
