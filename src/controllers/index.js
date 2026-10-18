import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { logoutUser } from "./auth/logoutUser.js";
import { getCategories } from "./categories/getCategories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { getSavedStories } from "./users/getSavedStories.js";
import { saveStory } from "./users/saveStory.js";
import { removeSavedStory } from "./users/removeSavedStory.js";

export const auth = {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
};

export const categories = {
  getCategories,
};

export const stories = {
  getStoryById,
};

export const users = {
  getSavedStories,
  saveStory,
  removeSavedStory,
};
