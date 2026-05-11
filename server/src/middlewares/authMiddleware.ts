import type { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authorization token is required",
      details: null,
    });
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}
