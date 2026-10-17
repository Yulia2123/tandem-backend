import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { refreshUserSession } from "./auth/refreshUserSession.js";
import { getCategories } from "./categories/getCategories.js";

export const auth = {
  registerUser,
  loginUser,
  refreshUserSession,
};

export const categories = {
  getCategories,
};
