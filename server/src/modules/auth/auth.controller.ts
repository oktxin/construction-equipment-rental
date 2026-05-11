import type { NextFunction, Request, Response } from "express";

import { successResponse } from "../../utils/apiResponse";
import { getCurrentUser, loginUser, registerUser } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validators";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = registerSchema.parse(req.body);
    const data = await registerUser(payload);
    return res
      .status(201)
      .json(successResponse(data, "User registered successfully"));
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = loginSchema.parse(req.body);
    const data = await loginUser(payload);
    return res.status(200).json(successResponse(data, "Login successful"));
  } catch (error) {
    next(error);
  }
}

export async function meController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.user;

    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "Authorization is required",
        details: null,
      });
    }

    const data = await getCurrentUser(currentUser.userId);
    return res
      .status(200)
      .json(successResponse(data, "Current user fetched successfully"));
  } catch (error) {
    next(error);
  }
}
