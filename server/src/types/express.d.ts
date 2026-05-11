import type { RoleName } from "../modules/auth/auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: RoleName;
      };
    }
  }
}

export {};
