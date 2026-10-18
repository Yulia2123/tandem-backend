import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { getCategories } from "./categories/getCategories.js";
import { getSavedStories } from "./users/getSavedStories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { logoutUser } from "./auth/logoutUser.js";

export const auth = {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
};

export const categories = {
  getCategories,
};

export const users = {
  getSavedStories,
};

export const stories = {
  getStoryById,
};