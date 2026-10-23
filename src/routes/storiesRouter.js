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

storiesRouter.get(
  "/",
  celebrate(getAllStoriesValidationSchema),
  ctrl.getAllStories
);

// question: Few images
storiesRouter.post(
  "/",
  authenticate,
  upload.single("img"),
  celebrate(createStoryValidationSchema),
  ctrl.createStory
);

storiesRouter.get(
  "/:storyId",
  celebrate(getStoryIdValidationSchema),
  ctrl.getStoryById
);

storiesRouter.get(
  "/:storyId/recommended",
  celebrate(getStoryIdValidationSchema),
  ctrl.getRecommendedStories
);

export default storiesRouter;
