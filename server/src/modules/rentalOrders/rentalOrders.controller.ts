import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../../utils/apiError";
import { successResponse } from "../../utils/apiResponse";
import {
  calculateRentalOrder,
  cancelRentalOrder,
  createRentalOrder,
  getAdminRentalOrderById,
  getRentalOrderForActor,
  listAdminRentalOrders,
  listMyRentalOrders,
  updateRentalOrderComment,
  updateRentalOrderStatus,
} from "./rentalOrders.service";
import {
  adminRentalOrdersQuerySchema,
  calculateRentalOrderSchema,
  createRentalOrderSchema,
  myRentalOrdersQuerySchema,
  rentalOrderIdParamSchema,
  updateRentalOrderCommentSchema,
  updateRentalOrderStatusSchema,
} from "./rentalOrders.validators";

function ensureAuthenticatedUser(req: Request) {
  if (!req.user) {
    throw new ApiError(401, "Authorization is required");
  }

  return req.user;
}

export async function calculateRentalOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = calculateRentalOrderSchema.parse(req.body);
    const data = await calculateRentalOrder(payload);
    return res
      .status(200)
      .json(successResponse(data, "Rental order calculation completed successfully"));
  } catch (error) {
    next(error);
  }
}

export async function createRentalOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = createRentalOrderSchema.parse(req.body);
    const actor = ensureAuthenticatedUser(req);
    const data = await createRentalOrder(actor, payload);
    return res
      .status(201)
      .json(successResponse(data, "Rental order created successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listMyRentalOrdersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = myRentalOrdersQuerySchema.parse(req.query);
    const actor = ensureAuthenticatedUser(req);
    const data = await listMyRentalOrders(actor, query);
    return res
      .status(200)
      .json(successResponse(data, "Rental orders fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getMyRentalOrderByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = rentalOrderIdParamSchema.parse(req.params);
    const actor = ensureAuthenticatedUser(req);
    const data = await getRentalOrderForActor(id, actor);
    return res
      .status(200)
      .json(successResponse(data, "Rental order details fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function cancelRentalOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = rentalOrderIdParamSchema.parse(req.params);
    const actor = ensureAuthenticatedUser(req);
    const data = await cancelRentalOrder(id, actor);
    return res
      .status(200)
      .json(successResponse(data, "Rental order cancelled successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listAdminRentalOrdersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = adminRentalOrdersQuerySchema.parse(req.query);
    const data = await listAdminRentalOrders(query);
    return res
      .status(200)
      .json(successResponse(data, "Admin rental orders fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getAdminRentalOrderByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = rentalOrderIdParamSchema.parse(req.params);
    const data = await getAdminRentalOrderById(id);
    return res
      .status(200)
      .json(successResponse(data, "Admin rental order details fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateRentalOrderStatusController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = rentalOrderIdParamSchema.parse(req.params);
    const payload = updateRentalOrderStatusSchema.parse(req.body);
    const data = await updateRentalOrderStatus(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Rental order status updated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateRentalOrderCommentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = rentalOrderIdParamSchema.parse(req.params);
    const payload = updateRentalOrderCommentSchema.parse(req.body);
    const data = await updateRentalOrderComment(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Rental order manager comment updated successfully"));
  } catch (error) {
    next(error);
  }
}
