import { Joi, Segments } from "celebrate";

export const getAllStoriesValidationSchema = {
    [Segments.QUERY]: Joi.object({
    perPage: Joi.number().integer().min(5).max(20).default(10),
    page: Joi.number().min(1).default(1),
    category: Joi.string().valid(...TAGS),
    popular: Joi.string().valid('asc', 'desc')
    })
}