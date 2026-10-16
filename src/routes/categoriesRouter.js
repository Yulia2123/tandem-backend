import { Router } from "express";

const categoriesRouter = Router();

import { categories as ctrl } from "../controllers/index.js";

categoriesRouter.get("/", ctrl.getCategories);

export default categoriesRouter;
