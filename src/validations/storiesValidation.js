import { Joi, Segments } from "celebrate";
import { CATEGORIES } from "../constants/constants.js";
export const getAllStoriesValidationSchema = {
    [Segments.QUERY]: Joi.object({
    perPage: Joi.number().integer().min(5).max(20).default(10),
    page: Joi.number().min(1).default(1),
    category: Joi.string().valid(...CATEGORIES),
    popular: Joi.string().valid('asc', 'desc')
    })
}