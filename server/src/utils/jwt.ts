import jwt from "jsonwebtoken";

import { env } from "../config/env";
import type { AccessTokenPayload } from "../modules/auth/auth.types";
import { ApiError } from "./apiError";

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
  } catch {
    throw new ApiError(401, "Invalid or expired access token");
  }
}
