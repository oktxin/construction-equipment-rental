import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryBySlugController,
  listCategoriesController,
  updateCategoryController,
} from "./categories.controller";

export const categoriesRouter = Router();

categoriesRouter.get("/", listCategoriesController);
categoriesRouter.get("/:slug", getCategoryBySlugController);
categoriesRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  createCategoryController,
);
categoriesRouter.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  updateCategoryController,
);
categoriesRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteCategoryController,
);
