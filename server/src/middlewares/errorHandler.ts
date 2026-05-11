import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { ApiError } from "../utils/apiError";
import { errorResponse } from "../utils/apiResponse";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json(errorResponse("Validation failed", error.flatten()));
  }

  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json(errorResponse(error.message, error.details));
  }

  console.error(error);

  return res.status(500).json(errorResponse("Internal server error"));
}
