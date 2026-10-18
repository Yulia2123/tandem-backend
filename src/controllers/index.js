
import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getCategories } from "./categories/getCategories.js";
import { getSavedStories } from "./users/getSavedStories.js";

export const auth = {
  registerUser,
  loginUser,
};

export const categories = {
  getCategories,
};

export const users = {
  getSavedStories,
};
