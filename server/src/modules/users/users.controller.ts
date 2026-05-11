import type { NextFunction, Request, Response } from "express";

import { successResponse } from "../../utils/apiResponse";
import {
  blockUserSchema,
  updateUserSchema,
  userIdParamSchema,
  usersQuerySchema,
} from "./users.validators";
import {
  getUserById,
  listUsers,
  setUserBlockedState,
  updateUser,
} from "./users.service";

export async function listUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = usersQuerySchema.parse(req.query);
    const data = await listUsers(query);
    return res.status(200).json(successResponse(data, "Users fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdParamSchema.parse(req.params);

    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authorization is required",
        details: null,
      });
    }

    const data = await getUserById(id, req.user);
    return res.status(200).json(successResponse(data, "User fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const payload = updateUserSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authorization is required",
        details: null,
      });
    }

    const data = await updateUser(id, payload, req.user);
    return res.status(200).json(successResponse(data, "User updated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function blockUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const payload = blockUserSchema.parse(req.body);
    const data = await setUserBlockedState(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "User block status updated successfully"));
  } catch (error) {
    next(error);
  }
}
