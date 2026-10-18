import { createStory } from "./stories/createStory.js";
import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getCategories } from "./categories/getCategories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { logoutUser } from "./auth/logoutUser.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
};

export const categories = {
  getCategories,
};

export const stories = {
  getStoryById,
  createStory,
};
