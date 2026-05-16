import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  deleteAdminReportController,
  downloadReportController,
  generateAdminRentalStatisticsReportController,
  generateOrderReportController,
  generateRentalHistoryReportController,
  listAdminReportsController,
  listMyReportsController,
} from "./reports.controller";

export const reportsRouter = Router();
export const adminReportsRouter = Router();

reportsRouter.use(authMiddleware, roleMiddleware(["CLIENT", "ADMIN"]));
reportsRouter.post("/order/:orderId", generateOrderReportController);
reportsRouter.post("/rental-history", generateRentalHistoryReportController);
reportsRouter.get("/my", listMyReportsController);
reportsRouter.get("/:id/download", downloadReportController);

adminReportsRouter.use(authMiddleware, roleMiddleware(["ADMIN"]));
adminReportsRouter.post(
  "/rental-statistics",
  generateAdminRentalStatisticsReportController,
);
adminReportsRouter.get("/", listAdminReportsController);
adminReportsRouter.delete("/:id", deleteAdminReportController);
