import {
  EquipmentStatus,
  Prisma,
  type Equipment,
  type Review,
} from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import { normalizeSlug } from "../../utils/slug";
import type {
  CatalogFiltersApplied,
  EquipmentSortBy,
} from "./equipment.types";
import type {
  CreateEquipmentInput,
  EquipmentListQueryInput,
  ReplaceEquipmentImagesInput,
  ReplaceEquipmentSpecsInput,
  UpdateEquipmentInput,
} from "./equipment.validators";

const publicEquipmentInclude = {
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
      iconName: true,
    },
  },
  images: {
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
} satisfies Prisma.EquipmentInclude;

const equipmentDetailsInclude = {
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      iconName: true,
    },
  },
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  specs: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  reviews: {
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
  },
} satisfies Prisma.EquipmentInclude;

function getAverageRating(reviews: Pick<Review, "rating">[]) {
  if (reviews.length === 0) {
    return null;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / reviews.length).toFixed(2));
}

function buildCatalogWhere(
  query: EquipmentListQueryInput,
): Prisma.EquipmentWhereInput {
  const where: Prisma.EquipmentWhereInput = {
    status: query.status ?? {
      not: EquipmentStatus.ARCHIVED,
    },
  };

  if (query.search) {
    where.OR = [
      {
        name: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        brand: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        model: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        shortDescription: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (query.categorySlug) {
    where.category = {
      slug: normalizeSlug(query.categorySlug),
    };
  }

  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.dailyPrice = {};

    if (query.minPrice !== undefined) {
      where.dailyPrice.gte = query.minPrice;
    }

    if (query.maxPrice !== undefined) {
      where.dailyPrice.lte = query.maxPrice;
    }
  }

  if (typeof query.isFeatured === "boolean") {
    where.isFeatured = query.isFeatured;
  }

  return where;
}

function getCatalogOrderBy(
  sortBy: EquipmentSortBy,
  sortOrder: "asc" | "desc",
): Prisma.EquipmentOrderByWithRelationInput {
  if (sortBy === "popularity" || sortBy === "rating") {
    return {
      createdAt: sortOrder,
    };
  }

  return {
    [sortBy]: sortOrder,
  };
}

function mapCatalogItem(
  item: Prisma.EquipmentGetPayload<{ include: typeof publicEquipmentInclude }>,
) {
  const averageRating = getAverageRating(item.reviews);
  const mainImage = item.images[0]
    ? {
        id: item.images[0].id,
        url: item.images[0].url,
        alt: item.images[0].alt,
        sortOrder: item.images[0].sortOrder,
      }
    : null;

  return {
    id: item.id,
    name: item.name,
    slug: item.slug,
    shortDescription: item.shortDescription,
    brand: item.brand,
    model: item.model,
    dailyPrice: Number(item.dailyPrice),
    depositAmount: Number(item.depositAmount),
    quantityAvailable: item.quantityAvailable,
    status: item.status,
    isFeatured: item.isFeatured,
    category: item.category,
    mainImage,
    averageRating,
    reviewsCount: item.reviews.length,
  };
}

async function ensureCategoryExists(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
}

async function ensureEquipmentSlugAvailable(slug: string, excludeId?: string) {
  const existing = await prisma.equipment.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== excludeId) {
    throw new ApiError(409, "Equipment slug is already in use");
  }
}

async function ensureEquipmentExists(id: string): Promise<Equipment> {
  const equipment = await prisma.equipment.findUnique({
    where: { id },
  });

  if (!equipment) {
    throw new ApiError(404, "Equipment not found");
  }

  return equipment;
}

function normalizeEquipmentData(
  input:
    | CreateEquipmentInput
    | UpdateEquipmentInput,
) {
  return {
    categoryId: input.categoryId,
    name: input.name?.trim(),
    slug: input.slug ? normalizeSlug(input.slug) : undefined,
    shortDescription: input.shortDescription,
    description: input.description,
    brand: input.brand,
    model: input.model,
    dailyPrice: input.dailyPrice,
    depositAmount: input.depositAmount,
    quantityTotal: input.quantityTotal,
    quantityAvailable: input.quantityAvailable,
    power: input.power,
    weight: input.weight,
    status: input.status,
    isFeatured: input.isFeatured,
  };
}

function buildAppliedFilters(query: EquipmentListQueryInput): CatalogFiltersApplied {
  return {
    search: query.search,
    categorySlug: query.categorySlug ? normalizeSlug(query.categorySlug) : undefined,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    status: query.status,
    isFeatured: query.isFeatured,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
  };
}

export async function listEquipment(query: EquipmentListQueryInput) {
  const where = buildCatalogWhere(query);
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = getCatalogOrderBy(query.sortBy, query.sortOrder);

  const [items, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      include: publicEquipmentInclude,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.equipment.count({ where }),
  ]);

  return {
    items: items.map(mapCatalogItem),
    pagination: buildPaginationMeta({ page, limit, total }),
    filters: {
      applied: buildAppliedFilters(query),
    },
  };
}

export async function listFeaturedEquipment() {
  const items = await prisma.equipment.findMany({
    where: {
      isFeatured: true,
      status: {
        not: EquipmentStatus.ARCHIVED,
      },
    },
    take: 8,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: publicEquipmentInclude,
  });

  return items.map(mapCatalogItem);
}

export async function getEquipmentBySlug(slug: string) {
  const equipment = await prisma.equipment.findUnique({
    where: {
      slug: normalizeSlug(slug),
    },
    include: equipmentDetailsInclude,
  });

  if (!equipment || equipment.status === EquipmentStatus.ARCHIVED) {
    throw new ApiError(404, "Equipment not found");
  }

  const averageRating = getAverageRating(equipment.reviews);
  const similarEquipmentRaw = await prisma.equipment.findMany({
    where: {
      categoryId: equipment.categoryId,
      id: {
        not: equipment.id,
      },
      status: {
        not: EquipmentStatus.ARCHIVED,
      },
    },
    take: 4,
    include: publicEquipmentInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    id: equipment.id,
    categoryId: equipment.categoryId,
    name: equipment.name,
    slug: equipment.slug,
    shortDescription: equipment.shortDescription,
    description: equipment.description,
    brand: equipment.brand,
    model: equipment.model,
    dailyPrice: Number(equipment.dailyPrice),
    depositAmount: Number(equipment.depositAmount),
    quantityTotal: equipment.quantityTotal,
    quantityAvailable: equipment.quantityAvailable,
    power: equipment.power === null ? null : Number(equipment.power),
    weight: equipment.weight === null ? null : Number(equipment.weight),
    status: equipment.status,
    isFeatured: equipment.isFeatured,
    createdAt: equipment.createdAt,
    updatedAt: equipment.updatedAt,
    category: equipment.category,
    images: equipment.images,
    specs: equipment.specs,
    reviews: equipment.reviews,
    averageRating,
    reviewsCount: equipment.reviews.length,
    similarEquipment: similarEquipmentRaw.map(mapCatalogItem),
  };
}

export async function createEquipment(input: CreateEquipmentInput) {
  await ensureCategoryExists(input.categoryId);

  const data = normalizeEquipmentData(input);

  if (!data.slug) {
    throw new ApiError(400, "Equipment slug is required");
  }

  await ensureEquipmentSlugAvailable(data.slug);

  const createdEquipment = await prisma.equipment.create({
    data: {
      categoryId: input.categoryId,
      name: data.name!,
      slug: data.slug,
      shortDescription: data.shortDescription ?? null,
      description: data.description ?? null,
      brand: data.brand ?? null,
      model: data.model ?? null,
      dailyPrice: data.dailyPrice!,
      depositAmount: data.depositAmount!,
      quantityTotal: data.quantityTotal!,
      quantityAvailable: data.quantityAvailable!,
      power: data.power ?? null,
      weight: data.weight ?? null,
      status: data.status!,
      isFeatured: data.isFeatured!,
      images: {
        create: input.images.map((image) => ({
          url: image.url,
          alt: image.alt ?? null,
          sortOrder: image.sortOrder,
        })),
      },
      specs: {
        create: input.specs.map((spec) => ({
          name: spec.name,
          value: spec.value,
          unit: spec.unit ?? null,
          sortOrder: spec.sortOrder,
        })),
      },
    },
    include: equipmentDetailsInclude,
  });

  return createdEquipment;
}

export async function updateEquipment(id: string, input: UpdateEquipmentInput) {
  const existing = await ensureEquipmentExists(id);
  const data = normalizeEquipmentData(input);

  if (input.categoryId) {
    await ensureCategoryExists(input.categoryId);
  }

  if (data.slug) {
    await ensureEquipmentSlugAvailable(data.slug, existing.id);
  }

  const nextQuantityTotal = input.quantityTotal ?? existing.quantityTotal;
  const nextQuantityAvailable =
    input.quantityAvailable ?? existing.quantityAvailable;

  if (nextQuantityAvailable > nextQuantityTotal) {
    throw new ApiError(
      400,
      "quantityAvailable cannot be greater than quantityTotal",
    );
  }

  return prisma.equipment.update({
    where: { id },
    data: {
      categoryId: data.categoryId,
      name: data.name,
      slug: data.slug,
      shortDescription:
        input.shortDescription === undefined ? undefined : input.shortDescription,
      description: input.description === undefined ? undefined : input.description,
      brand: input.brand === undefined ? undefined : input.brand,
      model: input.model === undefined ? undefined : input.model,
      dailyPrice: data.dailyPrice,
      depositAmount: data.depositAmount,
      quantityTotal: data.quantityTotal,
      quantityAvailable: data.quantityAvailable,
      power: input.power === undefined ? undefined : (data.power ?? null),
      weight: input.weight === undefined ? undefined : (data.weight ?? null),
      status: data.status,
      isFeatured: data.isFeatured,
    },
    include: equipmentDetailsInclude,
  });
}

export async function replaceEquipmentImages(
  id: string,
  input: ReplaceEquipmentImagesInput,
) {
  await ensureEquipmentExists(id);

  await prisma.$transaction([
    prisma.equipmentImage.deleteMany({
      where: { equipmentId: id },
    }),
    prisma.equipment.update({
      where: { id },
      data: {
        images: {
          create: input.images.map((image) => ({
            url: image.url,
            alt: image.alt ?? null,
            sortOrder: image.sortOrder,
          })),
        },
      },
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    }),
  ]);

  return prisma.equipment.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export async function replaceEquipmentSpecs(
  id: string,
  input: ReplaceEquipmentSpecsInput,
) {
  await ensureEquipmentExists(id);

  await prisma.$transaction([
    prisma.equipmentSpec.deleteMany({
      where: { equipmentId: id },
    }),
    prisma.equipment.update({
      where: { id },
      data: {
        specs: {
          create: input.specs.map((spec) => ({
            name: spec.name,
            value: spec.value,
            unit: spec.unit ?? null,
            sortOrder: spec.sortOrder,
          })),
        },
      },
      include: {
        specs: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    }),
  ]);

  return prisma.equipment.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      specs: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });
}

export async function deleteEquipment(id: string) {
  const existingEquipment = await prisma.equipment.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          rentalItems: true,
        },
      },
    },
  });

  if (!existingEquipment) {
    throw new ApiError(404, "Equipment not found");
  }

  if (existingEquipment._count.rentalItems > 0) {
    const archived = await prisma.equipment.update({
      where: { id },
      data: {
        status: EquipmentStatus.ARCHIVED,
        isFeatured: false,
      },
    });

    return {
      deleted: false,
      archived: true,
      equipment: archived,
    };
  }

  await prisma.equipment.delete({
    where: { id },
  });

  return {
    deleted: true,
    archived: false,
  };
}
