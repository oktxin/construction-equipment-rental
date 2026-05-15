import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  calculateRentalOrderController,
  cancelRentalOrderController,
  createRentalOrderController,
  getAdminRentalOrderByIdController,
  getMyRentalOrderByIdController,
  listAdminRentalOrdersController,
  listMyRentalOrdersController,
  updateRentalOrderCommentController,
  updateRentalOrderStatusController,
} from "./rentalOrders.controller";

export const rentalOrdersRouter = Router();
export const adminRentalOrdersRouter = Router();

rentalOrdersRouter.use(authMiddleware, roleMiddleware(["CLIENT", "ADMIN"]));
rentalOrdersRouter.post("/calculate", calculateRentalOrderController);
rentalOrdersRouter.post("/", createRentalOrderController);
rentalOrdersRouter.get("/my", listMyRentalOrdersController);
rentalOrdersRouter.get("/my/:id", getMyRentalOrderByIdController);
rentalOrdersRouter.patch("/:id/cancel", cancelRentalOrderController);

adminRentalOrdersRouter.use(authMiddleware, roleMiddleware(["ADMIN"]));
adminRentalOrdersRouter.get("/", listAdminRentalOrdersController);
adminRentalOrdersRouter.get("/:id", getAdminRentalOrderByIdController);
adminRentalOrdersRouter.patch("/:id/status", updateRentalOrderStatusController);
adminRentalOrdersRouter.patch("/:id/comment", updateRentalOrderCommentController);
