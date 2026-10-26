import { Joi, Segments } from "celebrate";
// import { CATEGORIES } from "../constants/constants.js";
import { isValidObjectId } from "mongoose";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message("Invalid id format"): value;
};

export const getAllStoriesValidationSchema = {
  [Segments.QUERY]: Joi.object({
    perPage: Joi.number().integer().min(5).max(20).default(10),
    page: Joi.number().min(1).default(1),
    category: Joi.string().custom(objectIdValidator),
    popular: Joi.string().valid("asc", "desc"),
    ownerId: Joi.string().custom(objectIdValidator),
  }),
};


// export const getAllStoriesValidationSchema = {
//   [Segments.QUERY]: Joi.object({
//     perPage: Joi.number().integer().min(5).max(20).default(10),
//     page: Joi.number().min(1).default(1),
//     category: Joi.string().valid(...CATEGORIES),
//     popular: Joi.string().valid("asc", "desc"),
//   }),
// };

export const getStoryIdValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createStoryValidationSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().required(),
    article: Joi.string().required(),
    category: Joi.string().custom(objectIdValidator).required(),
    rate: Joi.number().min(0).default(0),
    date: Joi.string().required(),
  }),
};
