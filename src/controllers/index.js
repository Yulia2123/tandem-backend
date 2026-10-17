import { registerUser } from "./auth/registerUser.js";
import { getCategories } from "./categories/getCategories.js";
import { getStoryById } from "./stories/getStoryById.js";

export const auth = {
  registerUser,
};

export const categories = {
  getCategories,
};

export const stories = {
  getStoryById,
};
