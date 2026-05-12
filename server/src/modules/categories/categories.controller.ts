import type { NextFunction, Request, Response } from "express";

import { successResponse } from "../../utils/apiResponse";
import {
  categoryIdParamSchema,
  categoryListQuerySchema,
  categorySlugParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./categories.validators";
import {
  createCategory,
  deleteCategory,
  getCategoryBySlug,
  listCategories,
  updateCategory,
} from "./categories.service";

export async function listCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = categoryListQuerySchema.parse(req.query);
    const data = await listCategories(query);
    return res
      .status(200)
      .json(successResponse(data, "Categories fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function getCategoryBySlugController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { slug } = categorySlugParamSchema.parse(req.params);
    const data = await getCategoryBySlug(slug);
    return res
      .status(200)
      .json(successResponse(data, "Category fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function createCategoryController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const payload = createCategorySchema.parse(req.body);
    const data = await createCategory(payload);
    return res
      .status(201)
      .json(successResponse(data, "Category created successfully"));
  } catch (error) {
    next(error);
  }
}

export async function updateCategoryController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = categoryIdParamSchema.parse(req.params);
    const payload = updateCategorySchema.parse(req.body);
    const data = await updateCategory(id, payload);
    return res
      .status(200)
      .json(successResponse(data, "Category updated successfully"));
  } catch (error) {
    next(error);
  }
}

export async function deleteCategoryController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = categoryIdParamSchema.parse(req.params);
    const data = await deleteCategory(id);
    return res
      .status(200)
      .json(successResponse(data, "Category deleted successfully"));
  } catch (error) {
    next(error);
  }
}
