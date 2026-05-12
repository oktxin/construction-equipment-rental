import { Router } from "express";

import { authMiddleware } from "../../middlewares/authMiddleware";
import { roleMiddleware } from "../../middlewares/roleMiddleware";
import {
  createEquipmentController,
  deleteEquipmentController,
  getEquipmentBySlugController,
  listEquipmentController,
  listFeaturedEquipmentController,
  replaceEquipmentImagesController,
  replaceEquipmentSpecsController,
  updateEquipmentController,
} from "./equipment.controller";

export const equipmentRouter = Router();

equipmentRouter.get("/", listEquipmentController);
equipmentRouter.get("/featured", listFeaturedEquipmentController);
equipmentRouter.get("/:slug", getEquipmentBySlugController);
equipmentRouter.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  createEquipmentController,
);
equipmentRouter.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  updateEquipmentController,
);
equipmentRouter.put(
  "/:id/images",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  replaceEquipmentImagesController,
);
equipmentRouter.put(
  "/:id/specs",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  replaceEquipmentSpecsController,
);
equipmentRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteEquipmentController,
);
