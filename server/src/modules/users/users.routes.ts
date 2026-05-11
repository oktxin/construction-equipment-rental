import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  blockUserController,
  getUserByIdController,
  listUsersController,
  updateUserController,
} from "./users.controller";

export const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.get("/", roleMiddleware(["ADMIN"]), listUsersController);
usersRouter.get("/:id", getUserByIdController);
usersRouter.patch("/:id", updateUserController);
usersRouter.patch("/:id/block", roleMiddleware(["ADMIN"]), blockUserController);
