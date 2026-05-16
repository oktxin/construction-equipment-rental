import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../../utils/apiError";
import { successResponse } from "../../utils/apiResponse";
import {
  deleteAdminReport,
  generateAdminRentalStatisticsReport,
  generateOrderReport,
  generateRentalHistoryReport,
  getReportDownloadForActor,
  listAdminReports,
  listMyReports,
} from "./reports.service";
import {
  adminReportsQuerySchema,
  generateAdminStatisticsReportSchema,
  generateOrderReportSchema,
  generateRentalHistoryReportSchema,
  myReportsQuerySchema,
  orderReportParamsSchema,
  reportIdParamSchema,
} from "./reports.validators";

function ensureAuthenticatedUser(req: Request) {
  if (!req.user) {
    throw new ApiError(401, "Authorization is required");
  }

  return req.user;
}

export async function generateOrderReportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { orderId } = orderReportParamsSchema.parse(req.params);
    const payload = generateOrderReportSchema.parse(req.body);
    const data = await generateOrderReport(orderId, actor, payload);
    return res
      .status(201)
      .json(successResponse(data, "Order report generated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function generateRentalHistoryReportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const payload = generateRentalHistoryReportSchema.parse(req.body);
    const data = await generateRentalHistoryReport(actor, payload);
    return res
      .status(201)
      .json(successResponse(data, "Rental history report generated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listMyReportsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const query = myReportsQuerySchema.parse(req.query);
    const data = await listMyReports(actor, query);
    return res
      .status(200)
      .json(successResponse(data, "Reports fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function downloadReportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { id } = reportIdParamSchema.parse(req.params);
    const data = await getReportDownloadForActor(id, actor);
    return res.download(data.absolutePath, data.downloadName);
  } catch (error) {
    next(error);
  }
}

export async function generateAdminRentalStatisticsReportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const payload = generateAdminStatisticsReportSchema.parse(req.body);
    const data = await generateAdminRentalStatisticsReport(actor, payload);
    return res
      .status(201)
      .json(successResponse(data, "Admin rental statistics report generated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listAdminReportsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = adminReportsQuerySchema.parse(req.query);
    const data = await listAdminReports(query);
    return res
      .status(200)
      .json(successResponse(data, "Admin reports fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function deleteAdminReportController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = reportIdParamSchema.parse(req.params);
    const data = await deleteAdminReport(id);
    return res
      .status(200)
      .json(successResponse(data, "Report deleted successfully"));
  } catch (error) {
    next(error);
  }
}
