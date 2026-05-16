import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  createReviewController,
  deleteReviewController,
  listAdminReviewsController,
  listMyReviewsController,
  listPublicEquipmentReviewsController,
  updateReviewController,
  updateReviewPublishStateController,
} from "./reviews.controller";

export const reviewsRouter = Router();
export const adminReviewsRouter = Router();

reviewsRouter.get("/equipment/:equipmentId", listPublicEquipmentReviewsController);
reviewsRouter.use(authMiddleware, roleMiddleware(["CLIENT", "ADMIN"]));
reviewsRouter.get("/my", listMyReviewsController);
reviewsRouter.post("/", createReviewController);
reviewsRouter.patch("/:id", updateReviewController);
reviewsRouter.delete("/:id", deleteReviewController);

adminReviewsRouter.use(authMiddleware, roleMiddleware(["ADMIN"]));
adminReviewsRouter.get("/", listAdminReviewsController);
adminReviewsRouter.patch("/:id/publish", updateReviewPublishStateController);
