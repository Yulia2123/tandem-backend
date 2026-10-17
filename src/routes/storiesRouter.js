import { Router } from "express";
import { getAllStories } from "../controllers/stories/getStories";
import { celebrate } from "celebrate";
import { getAllStoriesValidationSchema } from "../validations/storiesValidation";

const storiesRouter = Router();
storiesRouter.get('/api/stories',celebrate(getAllStoriesValidationSchema), getAllStories)
export default storiesRouter;
