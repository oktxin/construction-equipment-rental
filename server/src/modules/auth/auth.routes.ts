import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import {
  loginController,
  meController,
  registerController,
} from "./auth.controller";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/me", authMiddleware, meController);
