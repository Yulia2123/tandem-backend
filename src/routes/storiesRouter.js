import { Router } from "express";
import { getAllStories } from "../controllers/stories/getStories.js";
import { createStory } from "../controllers/stories/createStory.js";
import { authenticate } from "../middleware/authenticate.js";
import { celebrate } from "celebrate";
import { getAllStoriesValidationSchema } from "../validations/storiesValidation.js";
import { stories as ctrl } from "../controllers/index.js";

const storiesRouter = Router();

// Ендпоінт для створення історії поточним користувачем (Завдання №10)
storiesRouter.post("/", authenticate, createStory);

storiesRouter.get("/:storyId", ctrl.getStoryById);
storiesRouter.get("/", celebrate(getAllStoriesValidationSchema), getAllStories);

export default storiesRouter;
