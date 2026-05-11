import type { NextFunction, Request, Response } from "express";

import type { RoleName } from "../modules/auth/auth.types";

export function roleMiddleware(allowedRoles: RoleName[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Authorization is required",
        details: null,
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to access this resource",
        details: null,
      });
    }

    next();
  };
}
