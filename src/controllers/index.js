import { createStory } from "./stories/createStory.js";
import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { logoutUser } from "./auth/logoutUser.js";
import { getCategories } from "./categories/getCategories.js";
import { getStoryById } from "./stories/getStoryById.js";
import { getRecommendedStories } from "./stories/getRecommendedStories.js";
import { getAllStories } from "./stories/getStories.js";
import { getCurrentUserStories } from "./users/getCurrentUserStories.js";
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
  createStory,
  getStoryById,
  getRecommendedStories,
  getAllStories,
};

export const users = {
  getCurrentUserStories,
  getSavedStories,
  saveStory,
  removeSavedStory,
};
