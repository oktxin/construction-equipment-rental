import { EquipmentStatus, Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import type { RoleName } from "../auth/auth.types";
import type { FavoritesListQueryInput } from "./favorites.validators";

type FavoritesActor = {
  userId: string;
  role: RoleName;
};

const favoriteInclude = {
  equipment: {
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          iconName: true,
        },
      },
      images: {
        take: 1,
        orderBy: {
          sortOrder: "asc",
        },
      },
      reviews: {
        where: {
          isPublished: true,
        },
        select: {
          rating: true,
        },
      },
    },
  },
} satisfies Prisma.FavoriteInclude;

type FavoriteWithEquipment = Prisma.FavoriteGetPayload<{
  include: typeof favoriteInclude;
}>;

function getAverageRating(reviews: Array<{ rating: number }>) {
  if (reviews.length === 0) {
    return null;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(2));
}

function mapFavoriteItem(item: FavoriteWithEquipment) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    equipment: {
      id: item.equipment.id,
      name: item.equipment.name,
      slug: item.equipment.slug,
      shortDescription: item.equipment.shortDescription,
      dailyPrice: Number(item.equipment.dailyPrice),
      depositAmount: Number(item.equipment.depositAmount),
      status: item.equipment.status,
      quantityAvailable: item.equipment.quantityAvailable,
      category: item.equipment.category,
      mainImage: item.equipment.images[0]
        ? {
            id: item.equipment.images[0].id,
            url: item.equipment.images[0].url,
            alt: item.equipment.images[0].alt,
            sortOrder: item.equipment.images[0].sortOrder,
          }
        : null,
      averageRating: getAverageRating(item.equipment.reviews),
      reviewsCount: item.equipment.reviews.length,
    },
  };
}

async function ensureEquipmentCanBeFavorited(equipmentId: string) {
  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
    select: {
      id: true,
      name: true,
      status: true,
    },
  });

  if (!equipment) {
    throw new ApiError(404, "Equipment not found");
  }

  if (equipment.status === EquipmentStatus.ARCHIVED) {
    throw new ApiError(409, "Archived equipment cannot be added to favorites");
  }

  return equipment;
}

export async function listFavorites(
  actor: FavoritesActor,
  query: FavoritesListQueryInput,
) {
  const { page, limit, skip } = getPaginationParams(query);
  const where: Prisma.FavoriteWhereInput = {
    userId: actor.userId,
  };

  const [items, total] = await Promise.all([
    prisma.favorite.findMany({
      where,
      include: favoriteInclude,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.favorite.count({ where }),
  ]);

  return {
    items: items.map(mapFavoriteItem),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function addFavorite(actor: FavoritesActor, equipmentId: string) {
  await ensureEquipmentCanBeFavorited(equipmentId);

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_equipmentId: {
        userId: actor.userId,
        equipmentId,
      },
    },
    include: favoriteInclude,
  });

  if (existingFavorite) {
    return {
      created: false,
      favorite: mapFavoriteItem(existingFavorite),
    };
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId: actor.userId,
      equipmentId,
    },
    include: favoriteInclude,
  });

  return {
    created: true,
    favorite: mapFavoriteItem(favorite),
  };
}

export async function removeFavorite(actor: FavoritesActor, equipmentId: string) {
  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_equipmentId: {
        userId: actor.userId,
        equipmentId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!existingFavorite) {
    return {
      deleted: false,
      equipmentId,
      isFavorite: false,
    };
  }

  await prisma.favorite.delete({
    where: {
      userId_equipmentId: {
        userId: actor.userId,
        equipmentId,
      },
    },
  });

  return {
    deleted: true,
    equipmentId,
    isFavorite: false,
  };
}

export async function checkFavorite(actor: FavoritesActor, equipmentId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_equipmentId: {
        userId: actor.userId,
        equipmentId,
      },
    },
    select: {
      id: true,
    },
  });

  return {
    isFavorite: Boolean(favorite),
  };
}
