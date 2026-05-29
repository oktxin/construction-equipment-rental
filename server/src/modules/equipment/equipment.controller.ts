import type { NextFunction, Request, Response } from "express";

import { successResponse } from "../../utils/apiResponse";
import {
  createEquipment,
  getEquipmentById,
  deleteEquipment,
  getEquipmentBySlug,
  listEquipment,
  listFeaturedEquipment,
  replaceEquipmentImages,
  replaceEquipmentSpecs,
  updateEquipment,
} from "./equipment.service";
import {
  createEquipmentSchema,
  equipmentIdParamSchema,
  equipmentListQuerySchema,
  equipmentSlugParamSchema,
  replaceEquipmentImagesSchema,
  replaceEquipmentSpecsSchema,
  updateEquipmentSchema,
} from "./equipment.validators";

export async function listEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = equipmentListQuerySchema.parse(req.query);
    const data = await listEquipment(query);
    return res
      .status(200)
      .json(successResponse(data, "Equipment catalog fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function listFeaturedEquipmentController(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await listFeaturedEquipment();
    return res
      .status(200)
      .json(successResponse(data, "Featured equipment fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = equipmentIdParamSchema.parse(req.params);
    const data = await getEquipmentById(id);
    return res
      .status(200)
      .json(successResponse(data, "Equipment details fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { slug } = equipmentSlugParamSchema.parse(req.params);
    const data = await getEquipmentBySlug(slug);
    return res
      .status(200)
      .json(successResponse(data, "Equipment details fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function createEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = createEquipmentSchema.parse(req.body);
    const data = await createEquipment(payload);
    return res
      .status(201)
      .json(successResponse(data, "Equipment created successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = equipmentIdParamSchema.parse(req.params);
    const payload = updateEquipmentSchema.parse(req.body);
    const data = await updateEquipment(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Equipment updated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function replaceEquipmentImagesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = equipmentIdParamSchema.parse(req.params);
    const payload = replaceEquipmentImagesSchema.parse(req.body);
    const data = await replaceEquipmentImages(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Equipment images replaced successfully"));
  } catch (error) {
    next(error);
  }
}

export async function replaceEquipmentSpecsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = equipmentIdParamSchema.parse(req.params);
    const payload = replaceEquipmentSpecsSchema.parse(req.body);
    const data = await replaceEquipmentSpecs(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Equipment specifications replaced successfully"));
  } catch (error) {
    next(error);
  }
}

export async function deleteEquipmentController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = equipmentIdParamSchema.parse(req.params);
    const data = await deleteEquipment(id);
    return res
      .status(200)
      .json(successResponse(data, "Equipment delete action completed successfully"));
  } catch (error) {
    next(error);
  }
}
