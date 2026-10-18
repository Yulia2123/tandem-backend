import { Router } from "express";
import { celebrate } from "celebrate";
import { stories as ctrl } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  getAllStoriesValidationSchema,
  getStoryIdValidationSchema,
  createStoryValidationSchema,
} from "../validations/storiesValidation.js";

const storiesRouter = Router();

// Отримання всіх історій (префікс /api/stories вже заданий у server.js)
storiesRouter.get(
  "/",
  celebrate(getAllStoriesValidationSchema),
  ctrl.getAllStories || ctrl.getStories,
);

// Створення нової історії (Завдання №10)
storiesRouter.post(
  "/",
  authenticate,
  celebrate(createStoryValidationSchema),
  ctrl.createStory,
);

// Отримання конкретної історії за ID
storiesRouter.get(
  "/:storyId",
  celebrate(getStoryIdValidationSchema),
  ctrl.getStoryById,
);

// Отримання рекомендованих історій
storiesRouter.get(
  "/:storyId/recommended",
  celebrate(getStoryIdValidationSchema),
  ctrl.getRecommendedStories,
);

export default storiesRouter;
