import type { NextFunction, Request, Response } from "express";

import { ApiError } from "../../utils/apiError";
import { successResponse } from "../../utils/apiResponse";
import {
  addFavorite,
  checkFavorite,
  listFavorites,
  removeFavorite,
} from "./favorites.service";
import {
  favoriteEquipmentParamSchema,
  favoritesListQuerySchema,
} from "./favorites.validators";

function ensureAuthenticatedUser(req: Request) {
  if (!req.user) {
    throw new ApiError(401, "Authorization is required");
  }

  return req.user;
}

export async function listFavoritesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const query = favoritesListQuerySchema.parse(req.query);
    const data = await listFavorites(actor, query);
    return res
      .status(200)
      .json(successResponse(data, "Favorites fetched successfully"));
  } catch (error) {
    next(error);
  }
}

export async function addFavoriteController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { equipmentId } = favoriteEquipmentParamSchema.parse(req.params);
    const result = await addFavorite(actor, equipmentId);
    return res
      .status(result.created ? 201 : 200)
      .json(
        successResponse(
          result,
          result.created
            ? "Equipment added to favorites successfully"
            : "Equipment is already in favorites",
        ),
      );
  } catch (error) {
    next(error);
  }
}

export async function removeFavoriteController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { equipmentId } = favoriteEquipmentParamSchema.parse(req.params);
    const data = await removeFavorite(actor, equipmentId);
    return res
      .status(200)
      .json(
        successResponse(
          data,
          data.deleted
            ? "Equipment removed from favorites successfully"
            : "Equipment is already absent from favorites",
        ),
      );
  } catch (error) {
    next(error);
  }
}

export async function checkFavoriteController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const actor = ensureAuthenticatedUser(req);
    const { equipmentId } = favoriteEquipmentParamSchema.parse(req.params);
    const data = await checkFavorite(actor, equipmentId);
    return res
      .status(200)
      .json(successResponse(data, "Favorite status fetched successfully"));
  } catch (error) {
    next(error);
  }
}
