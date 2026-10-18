import { registerUser } from "./auth/registerUser.js";
import { loginUser } from "./auth/loginUser.js";
import { getCategories } from "./categories/getCategories.js";
import { logoutUser } from "./auth/logoutUser.js";

export const auth = {
  registerUser,
  loginUser,
  logoutUser,
};

export const categories = {
  getCategories,
};
