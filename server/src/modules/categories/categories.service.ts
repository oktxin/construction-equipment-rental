import type { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import { normalizeSlug } from "../../utils/slug";
import type {
  CategoryListQueryInput,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.validators";

function buildCategoryWhere(query: CategoryListQueryInput): Prisma.CategoryWhereInput {
  if (!query.search) {
    return {};
  }

  return {
    OR: [
      {
        name: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        slug: {
          contains: normalizeSlug(query.search),
          mode: "insensitive",
        },
      },
    ],
  };
}

async function ensureCategorySlugAvailable(slug: string, excludeId?: string) {
  const existing = await prisma.category.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== excludeId) {
    throw new ApiError(409, "Category slug is already in use");
  }
}

export async function listCategories(query: CategoryListQueryInput) {
  const where = buildCategoryWhere(query);
  const { page, limit, skip } = getPaginationParams(query);

  const [items, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        name: "asc",
      },
      include: {
        _count: {
          select: {
            equipment: true,
          },
        },
      },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    items,
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function getCategoryBySlug(slug: string) {
  const category = await prisma.category.findUnique({
    where: {
      slug: normalizeSlug(slug),
    },
    include: {
      _count: {
        select: {
          equipment: true,
        },
      },
    },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return category;
}

export async function createCategory(input: CreateCategoryInput) {
  const slug = normalizeSlug(input.slug);
  await ensureCategorySlugAvailable(slug);

  return prisma.category.create({
    data: {
      name: input.name.trim(),
      slug,
      description: input.description ?? null,
      iconName: input.iconName ?? null,
    },
  });
}

export async function updateCategory(id: string, input: UpdateCategoryInput) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  const nextSlug = input.slug ? normalizeSlug(input.slug) : undefined;

  if (nextSlug) {
    await ensureCategorySlugAvailable(nextSlug, id);
  }

  return prisma.category.update({
    where: { id },
    data: {
      name: input.name?.trim(),
      slug: nextSlug,
      description: input.description === undefined ? undefined : input.description,
      iconName: input.iconName === undefined ? undefined : input.iconName,
    },
  });
}

export async function deleteCategory(id: string) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          equipment: true,
        },
      },
    },
  });

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  if (existingCategory._count.equipment > 0) {
    throw new ApiError(
      409,
      "Category cannot be deleted while equipment is assigned to it",
    );
  }

  await prisma.category.delete({
    where: { id },
  });

  return {
    deleted: true,
  };
}
