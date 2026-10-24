import { Joi, Segments } from "celebrate";

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  perPage: Joi.number().integer().min(5).max(20).default(10),
});

export const getCurrentUserStoriesValidationSchema = {
  [Segments.QUERY]: paginationSchema,
};

export const getUserProfileValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
  [Segments.QUERY]: paginationSchema,
};

export const getTravellersValidationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(12),
  }),
};
