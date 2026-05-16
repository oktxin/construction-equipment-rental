import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../../utils/apiError";
import { successResponse } from "../../utils/apiResponse";
import {
  createReview,
  deleteReview,
  listAdminReviews,
  listMyReviews,
  listPublicEquipmentReviews,
  updateReview,
  updateReviewPublishState,
} from "./reviews.service";
import {
  adminReviewsQuerySchema,
  createReviewSchema,
  equipmentReviewParamSchema,
  myReviewsQuerySchema,
  publicEquipmentReviewsQuerySchema,
  reviewIdParamSchema,
  updateReviewPublishSchema,
  updateReviewSchema,
} from "./reviews.validators";

function ensureAuthenticatedUser(req: Request) {
  if (!req.user) {
    throw new ApiError(401, "Authorization is required");
  }

  return req.user;
}

export async function listPublicEquipmentReviewsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { equipmentId } = equipmentReviewParamSchema.parse(req.params);
    const query = publicEquipmentReviewsQuerySchema.parse(req.query);
    const data = await listPublicEquipmentReviews(equipmentId, query);
    return res
      .status(200)
      .json(successResponse(data, "Published reviews fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function createReviewController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const payload = createReviewSchema.parse(req.body);
    const data = await createReview(actor, payload);
    return res
      .status(201)
      .json(successResponse(data, "Review created successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { id } = reviewIdParamSchema.parse(req.params);
    const payload = updateReviewSchema.parse(req.body);
    const data = await updateReview(id, actor, payload);
    return res
      .status(200)
      .json(successResponse(data, "Review updated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { id } = reviewIdParamSchema.parse(req.params);
    const data = await deleteReview(id, actor);
    return res
      .status(200)
      .json(successResponse(data, "Review deleted successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listMyReviewsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const query = myReviewsQuerySchema.parse(req.query);
    const data = await listMyReviews(actor, query);
    return res
      .status(200)
      .json(successResponse(data, "Current user reviews fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listAdminReviewsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = adminReviewsQuerySchema.parse(req.query);
    const data = await listAdminReviews(query);
    return res
      .status(200)
      .json(successResponse(data, "Reviews moderation list fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateReviewPublishStateController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = reviewIdParamSchema.parse(req.params);
    const payload = updateReviewPublishSchema.parse(req.body);
    const data = await updateReviewPublishState(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Review publish state updated successfully"));
  } catch (error) {
    next(error);
  }
}
