import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  addFavoriteController,
  checkFavoriteController,
  listFavoritesController,
  removeFavoriteController,
} from "./favorites.controller";

export const favoritesRouter = Router();

favoritesRouter.use(authMiddleware, roleMiddleware(["CLIENT", "ADMIN"]));
favoritesRouter.get("/", listFavoritesController);
favoritesRouter.post("/:equipmentId", addFavoriteController);
favoritesRouter.delete("/:equipmentId", removeFavoriteController);
favoritesRouter.get("/check/:equipmentId", checkFavoriteController);
