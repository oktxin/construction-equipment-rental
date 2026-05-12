import { Router } from "express";

import { authRouter } from "../modules/auth/auth.routes";
import { categoriesRouter } from "../modules/categories/categories.routes";
import { equipmentRouter } from "../modules/equipment/equipment.routes";
import { usersRouter } from "../modules/users/users.routes";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "BuildRent API is running",
  });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/equipment", equipmentRouter);
