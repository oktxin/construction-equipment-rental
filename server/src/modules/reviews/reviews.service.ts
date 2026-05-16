import { EquipmentStatus, Prisma, type PrismaClient } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { ApiError } from "../../utils/apiError";
import { buildPaginationMeta, getPaginationParams } from "../../utils/pagination";
import type { RoleName } from "../auth/auth.types";
import type { ReviewSortBy } from "./reviews.types";
import type {
  AdminReviewsQueryInput,
  CreateReviewInput,
  MyReviewsQueryInput,
  PublicEquipmentReviewsQueryInput,
  UpdateReviewInput,
  UpdateReviewPublishInput,
} from "./reviews.validators";

type ReviewsActor = {
  userId: string;
  role: RoleName;
};

type DatabaseClient = PrismaClient | Prisma.TransactionClient;

const reviewInclude = {
  user: {
    select: {
      id: true,
      fullName: true,
      avatarUrl: true,
      email: true,
    },
  },
  equipment: {
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      shortDescription: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      images: {
        take: 1,
        orderBy: {
          sortOrder: "asc",
        },
        select: {
          id: true,
          url: true,
          alt: true,
          sortOrder: true,
        },
      },
    },
  },
} satisfies Prisma.ReviewInclude;

type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: typeof reviewInclude;
}>;

function mapSortOrder<TField extends string>(
  sortBy: TField,
  sortOrder: "asc" | "desc",
) {
  return {
    [sortBy]: sortOrder,
  } as Record<TField, "asc" | "desc">;
}

function serializeReview(
  review: ReviewWithRelations,
  options?: { includeEmail?: boolean },
) {
  return {
    id: review.id,
    userId: review.userId,
    equipmentId: review.equipmentId,
    rating: review.rating,
    text: review.text,
    isPublished: review.isPublished,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
    user: {
      id: review.user.id,
      fullName: review.user.fullName,
      avatarUrl: review.user.avatarUrl,
      ...(options?.includeEmail ? { email: review.user.email } : {}),
    },
    equipment: {
      id: review.equipment.id,
      name: review.equipment.name,
      slug: review.equipment.slug,
      status: review.equipment.status,
      shortDescription: review.equipment.shortDescription,
      category: review.equipment.category,
      mainImage: review.equipment.images[0] ?? null,
    },
  };
}

async function ensureEquipmentCanBeReviewed(
  db: DatabaseClient,
  equipmentId: string,
) {
  const equipment = await db.equipment.findUnique({
    where: { id: equipmentId },
    select: {
      id: true,
      status: true,
    },
  });

  if (!equipment) {
    throw new ApiError(404, "Equipment not found");
  }

  if (equipment.status === EquipmentStatus.ARCHIVED) {
    throw new ApiError(409, "Archived equipment cannot receive new reviews");
  }

  return equipment;
}

async function ensureReviewExists(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: reviewInclude,
  });

  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  return review;
}

function buildPublicReviewsWhere(
  equipmentId: string,
  query: PublicEquipmentReviewsQueryInput,
): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {
    equipmentId,
    isPublished: true,
  };

  if (query.rating) {
    where.rating = query.rating;
  }

  return where;
}

function buildAdminReviewsWhere(
  query: AdminReviewsQueryInput,
): Prisma.ReviewWhereInput {
  const where: Prisma.ReviewWhereInput = {};

  if (query.search) {
    where.OR = [
      {
        text: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        user: {
          fullName: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
      {
        user: {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
      {
        equipment: {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  if (query.equipmentId) {
    where.equipmentId = query.equipmentId;
  }

  if (query.userId) {
    where.userId = query.userId;
  }

  if (query.rating) {
    where.rating = query.rating;
  }

  if (typeof query.isPublished === "boolean") {
    where.isPublished = query.isPublished;
  }

  return where;
}

export async function listPublicEquipmentReviews(
  equipmentId: string,
  query: PublicEquipmentReviewsQueryInput,
) {
  await ensureEquipmentCanBeReviewed(prisma, equipmentId);

  const where = buildPublicReviewsWhere(equipmentId, query);
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = mapSortOrder<ReviewSortBy>(query.sortBy, query.sortOrder);

  const [items, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: reviewInclude,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.review.count({ where }),
  ]);

  return {
    items: items.map((item) => serializeReview(item)),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function createReview(actor: ReviewsActor, input: CreateReviewInput) {
  await ensureEquipmentCanBeReviewed(prisma, input.equipmentId);

  const existingReview = await prisma.review.findFirst({
    where: {
      userId: actor.userId,
      equipmentId: input.equipmentId,
    },
    select: {
      id: true,
    },
  });

  if (existingReview) {
    throw new ApiError(409, "You have already left a review for this equipment");
  }

  const review = await prisma.review.create({
    data: {
      userId: actor.userId,
      equipmentId: input.equipmentId,
      rating: input.rating,
      text: input.text,
      isPublished: true,
    },
    include: reviewInclude,
  });

  return serializeReview(review);
}

export async function updateReview(
  id: string,
  actor: ReviewsActor,
  input: UpdateReviewInput,
) {
  const review = await ensureReviewExists(id);

  if (actor.role !== "ADMIN" && review.userId !== actor.userId) {
    throw new ApiError(403, "You do not have permission to edit this review");
  }

  if (review.equipment.status === EquipmentStatus.ARCHIVED) {
    throw new ApiError(409, "Reviews for archived equipment cannot be updated");
  }

  const updated = await prisma.review.update({
    where: { id },
    data: {
      rating: input.rating,
      text: input.text,
    },
    include: reviewInclude,
  });

  return serializeReview(updated, { includeEmail: actor.role === "ADMIN" });
}

export async function deleteReview(id: string, actor: ReviewsActor) {
  const review = await ensureReviewExists(id);

  if (actor.role !== "ADMIN" && review.userId !== actor.userId) {
    throw new ApiError(403, "You do not have permission to delete this review");
  }

  await prisma.review.delete({
    where: { id },
  });

  return {
    deleted: true,
    id,
  };
}

export async function listMyReviews(
  actor: ReviewsActor,
  query: MyReviewsQueryInput,
) {
  const where: Prisma.ReviewWhereInput = {
    userId: actor.userId,
  };
  const { page, limit, skip } = getPaginationParams(query);

  const [items, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: reviewInclude,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.review.count({ where }),
  ]);

  return {
    items: items.map((item) => serializeReview(item)),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function listAdminReviews(query: AdminReviewsQueryInput) {
  const where = buildAdminReviewsWhere(query);
  const { page, limit, skip } = getPaginationParams(query);
  const orderBy = mapSortOrder<ReviewSortBy>(query.sortBy, query.sortOrder);

  const [items, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: reviewInclude,
      skip,
      take: limit,
      orderBy,
    }),
    prisma.review.count({ where }),
  ]);

  return {
    items: items.map((item) => serializeReview(item, { includeEmail: true })),
    pagination: buildPaginationMeta({ page, limit, total }),
  };
}

export async function updateReviewPublishState(
  id: string,
  input: UpdateReviewPublishInput,
) {
  const existingReview = await prisma.review.findUnique({
    where: { id },
    select: {
      id: true,
    },
  });

  if (!existingReview) {
    throw new ApiError(404, "Review not found");
  }

  const updated = await prisma.review.update({
    where: { id },
    data: {
      isPublished: input.isPublished,
    },
    include: reviewInclude,
  });

  return serializeReview(updated, { includeEmail: true });
}
