import {
  EquipmentStatus,
  OrderStatus,
  PrismaClient,
  ReportFormat,
} from "@prisma/client";
import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { env } from "../src/config/env";
import { comparePasswords, hashPassword } from "../src/utils/password";
import { CATEGORY_SEEDS } from "./seed-data/categories";
import {
  buildFavoriteSeeds,
  buildPaymentSeeds,
  buildReportSeeds,
  buildReviewSeeds,
} from "./seed-data/engagement";
import { EQUIPMENT_SEEDS } from "./seed-data/equipment";
import { buildRentalOrderSeeds } from "./seed-data/rentalOrders";
import { ADMIN_SEED, CLIENT_PASSWORD, CLIENT_SEEDS } from "./seed-data/users";

const rootEnvPath = resolve(process.cwd(), "..", ".env");
const localEnvPath = resolve(process.cwd(), ".env");

if (existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}

if (existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

process.env.DATABASE_URL = process.env.DATABASE_URL || env.DATABASE_URL;

const prisma = new PrismaClient();

const LEGACY_SEED_ORDER_PREFIX = "BR-SEED-";
const DEMO_ORDER_PREFIX = "BR-202605-";
const SEEDED_CATEGORY_SLUGS = CATEGORY_SEEDS.map((category) => category.slug);
const SEEDED_EQUIPMENT_SLUGS = EQUIPMENT_SEEDS.map((equipment) => equipment.slug);
const TEMP_CATEGORY_SLUG_PREFIXES = [
  "rental-test-",
  "fav-review-",
  "public-reviews-",
  "catalog-reviews-",
  "reports-category-",
  "temp-category-",
];
const TEMP_EQUIPMENT_SLUG_PREFIXES = [
  "rental-test-",
  "fav-review-",
  "public-reviews-",
  "catalog-reviews-",
  "reports-machine-",
  "temp-equipment-",
];

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

function toBoundaryDates(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T23:59:59.999Z`);
  return { start, end };
}

async function upsertUser(params: {
  fullName: string;
  email: string;
  phone?: string | null;
  roleId: string;
  password: string;
}) {
  const existingUser = await prisma.user.findUnique({
    where: { email: params.email },
  });

  if (!existingUser) {
    const passwordHash = await hashPassword(params.password);

    return prisma.user.create({
      data: {
        fullName: params.fullName,
        email: params.email,
        phone: params.phone ?? null,
        passwordHash,
        roleId: params.roleId,
      },
    });
  }

  const passwordMatches = await comparePasswords(
    params.password,
    existingUser.passwordHash,
  );

  return prisma.user.update({
    where: { id: existingUser.id },
    data: {
      fullName: params.fullName,
      phone: params.phone ?? null,
      roleId: params.roleId,
      ...(passwordMatches
        ? {}
        : { passwordHash: await hashPassword(params.password) }),
    },
  });
}

async function seedRoles() {
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {
      description: "Administrator with full platform access",
    },
    create: {
      name: "ADMIN",
      description: "Administrator with full platform access",
    },
  });

  const clientRole = await prisma.role.upsert({
    where: { name: "CLIENT" },
    update: {
      description: "Client who can browse catalog and place rental orders",
    },
    create: {
      name: "CLIENT",
      description: "Client who can browse catalog and place rental orders",
    },
  });

  return { adminRole, clientRole };
}

async function seedUsers(roleIds: { adminRoleId: string; clientRoleId: string }) {
  const admin = await upsertUser({
    fullName: process.env.ADMIN_FULL_NAME || ADMIN_SEED.fullName,
    email: process.env.ADMIN_EMAIL || ADMIN_SEED.email,
    roleId: roleIds.adminRoleId,
    password: process.env.ADMIN_PASSWORD || ADMIN_SEED.password,
  });

  const clients = [];
  for (const client of CLIENT_SEEDS) {
    clients.push(
      await upsertUser({
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        roleId: roleIds.clientRoleId,
        password: CLIENT_PASSWORD,
      }),
    );
  }

  return { admin, clients };
}

async function seedCategories() {
  const categories = [];

  for (const category of CATEGORY_SEEDS) {
    categories.push(
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {
          name: category.name,
          description: category.description,
          iconName: category.iconName,
        },
        create: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          iconName: category.iconName,
        },
      }),
    );
  }

  return categories;
}

async function cleanupSmokeTestData() {
  const temporaryUsers = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: "@example.com",
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: "codex.auth.",
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const temporaryUserIds = temporaryUsers.map((user) => user.id);

  if (temporaryUserIds.length > 0) {
    await prisma.report.deleteMany({
      where: {
        userId: {
          in: temporaryUserIds,
        },
      },
    });

    await prisma.favorite.deleteMany({
      where: {
        userId: {
          in: temporaryUserIds,
        },
      },
    });

    await prisma.review.deleteMany({
      where: {
        userId: {
          in: temporaryUserIds,
        },
      },
    });

    await prisma.rentalOrder.deleteMany({
      where: {
        userId: {
          in: temporaryUserIds,
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        id: {
          in: temporaryUserIds,
        },
      },
    });
  }

  const temporaryCategories = await prisma.category.findMany({
    where: {
      OR: [
        ...TEMP_CATEGORY_SLUG_PREFIXES.map((prefix) => ({
          slug: {
            startsWith: prefix,
          },
        })),
        ...SEEDED_CATEGORY_SLUGS.map((slug) => ({
          slug: {
            startsWith: `${slug}-`,
          },
        })),
        {
          description: {
            equals: "tmp",
          },
        },
        {
          description: {
            contains: "Temporary",
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: "Temp ",
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: "Временн",
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const temporaryCategoryIds = temporaryCategories.map((category) => category.id);

  const temporaryEquipment = await prisma.equipment.findMany({
    where: {
      OR: [
        ...TEMP_EQUIPMENT_SLUG_PREFIXES.map((prefix) => ({
          slug: {
            startsWith: prefix,
          },
        })),
        ...SEEDED_EQUIPMENT_SLUGS.map((slug) => ({
          slug: {
            startsWith: `${slug}-`,
          },
        })),
        ...(temporaryCategoryIds.length > 0
          ? [
              {
                categoryId: {
                  in: temporaryCategoryIds,
                },
              },
            ]
          : []),
        {
          name: {
            contains: "Temporary",
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: "Temp ",
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: "Временн",
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (temporaryEquipment.length > 0) {
    await prisma.review.deleteMany({
      where: {
        equipmentId: {
          in: temporaryEquipment.map((item) => item.id),
        },
      },
    });

    await prisma.equipment.deleteMany({
      where: {
        id: {
          in: temporaryEquipment.map((item) => item.id),
        },
      },
    });
  }

  if (temporaryCategoryIds.length > 0) {
    await prisma.category.deleteMany({
      where: {
        id: {
          in: temporaryCategoryIds,
        },
      },
    });
  }
}

async function seedEquipment() {
  const {
    orders: orderSeeds,
    reservedByEquipmentSlug,
  } = buildRentalOrderSeeds({
    clients: CLIENT_SEEDS,
    equipment: EQUIPMENT_SEEDS,
  });

  const categoriesBySlug = new Map(
    (
      await prisma.category.findMany({
        where: {
          slug: {
            in: SEEDED_CATEGORY_SLUGS,
          },
        },
      })
    ).map((category) => [category.slug, category]),
  );

  const equipmentRecords = [];
  for (const item of EQUIPMENT_SEEDS) {
    const category = categoriesBySlug.get(item.categorySlug);

    if (!category) {
      throw new Error(`Missing category for seed equipment ${item.slug}`);
    }

    const reserved = reservedByEquipmentSlug.get(item.slug) ?? 0;
    const quantityAvailable =
      item.status === EquipmentStatus.AVAILABLE
        ? Math.max(0, item.baseQuantityAvailable - reserved)
        : item.baseQuantityAvailable;

    equipmentRecords.push(
      await prisma.equipment.upsert({
        where: { slug: item.slug },
        update: {
          categoryId: category.id,
          name: item.name,
          shortDescription: item.shortDescription,
          description: item.description,
          brand: item.brand,
          model: item.model,
          dailyPrice: item.dailyPrice,
          depositAmount: item.depositAmount,
          quantityTotal: item.quantityTotal,
          quantityAvailable,
          power: item.power,
          weight: item.weight,
          status: item.status,
          isFeatured: item.isFeatured,
        },
        create: {
          categoryId: category.id,
          name: item.name,
          slug: item.slug,
          shortDescription: item.shortDescription,
          description: item.description,
          brand: item.brand,
          model: item.model,
          dailyPrice: item.dailyPrice,
          depositAmount: item.depositAmount,
          quantityTotal: item.quantityTotal,
          quantityAvailable,
          power: item.power,
          weight: item.weight,
          status: item.status,
          isFeatured: item.isFeatured,
        },
      }),
    );
  }

  const equipmentBySlug = new Map(equipmentRecords.map((item) => [item.slug, item]));
  const seededEquipmentIds = equipmentRecords.map((item) => item.id);

  await prisma.equipmentImage.deleteMany({
    where: {
      equipmentId: {
        in: seededEquipmentIds,
      },
    },
  });

  await prisma.equipmentSpec.deleteMany({
    where: {
      equipmentId: {
        in: seededEquipmentIds,
      },
    },
  });

  await prisma.equipmentImage.createMany({
    data: EQUIPMENT_SEEDS.flatMap((item) =>
      item.images.map((image) => ({
        equipmentId: equipmentBySlug.get(item.slug)!.id,
        url: image.url,
        alt: image.alt,
        sortOrder: image.sortOrder,
      })),
    ),
  });

  await prisma.equipmentSpec.createMany({
    data: EQUIPMENT_SEEDS.flatMap((item) =>
      item.specs.map((spec, index) => ({
        equipmentId: equipmentBySlug.get(item.slug)!.id,
        name: spec.name,
        value: spec.value,
        unit: spec.unit ?? null,
        sortOrder: index,
      })),
    ),
  });

  return { orderSeeds, equipmentBySlug };
}

async function clearSeededRelationalData(params: {
  clientIds: string[];
  adminId: string;
}) {
  await prisma.report.deleteMany({
    where: {
      userId: {
        in: [...params.clientIds, params.adminId],
      },
    },
  });

  await prisma.favorite.deleteMany({
    where: {
      userId: {
        in: params.clientIds,
      },
    },
  });

  await prisma.review.deleteMany({
    where: {
      userId: {
        in: params.clientIds,
      },
    },
  });

  await prisma.rentalOrder.deleteMany({
    where: {
      OR: [
        {
          userId: {
            in: params.clientIds,
          },
        },
        {
          orderNumber: {
            startsWith: LEGACY_SEED_ORDER_PREFIX,
          },
        },
        {
          orderNumber: {
            startsWith: DEMO_ORDER_PREFIX,
          },
        },
      ],
    },
  });
}

async function seedOrders(orderSeeds: ReturnType<typeof buildRentalOrderSeeds>["orders"]) {
  const usersByEmail = new Map(
    (
      await prisma.user.findMany({
        where: {
          email: {
            in: [
              ...CLIENT_SEEDS.map((client) => client.email),
              process.env.ADMIN_EMAIL || ADMIN_SEED.email,
            ],
          },
        },
      })
    ).map((user) => [user.email, user]),
  );

  const equipmentBySlug = new Map(
    (
      await prisma.equipment.findMany({
        where: {
          slug: {
            in: SEEDED_EQUIPMENT_SLUGS,
          },
        },
      })
    ).map((equipment) => [equipment.slug, equipment]),
  );

  const createdOrders = [];

  for (const order of orderSeeds) {
    const user = usersByEmail.get(order.userEmail);

    if (!user) {
      throw new Error(`Missing user ${order.userEmail} for seeded order`);
    }

    const { start, end } = toBoundaryDates(order.startDate, order.endDate);

    createdOrders.push(
      await prisma.rentalOrder.create({
        data: {
          userId: user.id,
          orderNumber: order.orderNumber,
          status: order.status,
          startDate: start,
          endDate: end,
          deliveryType: order.deliveryType,
          deliveryAddress: order.deliveryAddress,
          customerComment: order.customerComment,
          managerComment: order.managerComment,
          subtotal: order.subtotal,
          depositTotal: order.depositTotal,
          deliveryPrice: order.deliveryPrice,
          totalPrice: order.totalPrice,
          items: {
            create: order.items.map((item) => {
              const equipment = equipmentBySlug.get(item.equipmentSlug);

              if (!equipment) {
                throw new Error(
                  `Missing equipment ${item.equipmentSlug} for order ${order.orderNumber}`,
                );
              }

              return {
                equipmentId: equipment.id,
                quantity: item.quantity,
                dailyPrice: item.dailyPrice,
                daysCount: item.daysCount,
                lineTotal: item.lineTotal,
              };
            }),
          },
        },
      }),
    );
  }

  return createdOrders;
}

async function seedFavorites() {
  const favorites = buildFavoriteSeeds({
    clients: CLIENT_SEEDS,
    equipment: EQUIPMENT_SEEDS,
  });

  const usersByEmail = new Map(
    (
      await prisma.user.findMany({
        where: {
          email: {
            in: CLIENT_SEEDS.map((client) => client.email),
          },
        },
      })
    ).map((user) => [user.email, user]),
  );

  const equipmentBySlug = new Map(
    (
      await prisma.equipment.findMany({
        where: {
          slug: {
            in: favorites.map((favorite) => favorite.equipmentSlug),
          },
        },
      })
    ).map((equipment) => [equipment.slug, equipment]),
  );

  await prisma.favorite.createMany({
    data: favorites.map((favorite) => ({
      userId: usersByEmail.get(favorite.userEmail)!.id,
      equipmentId: equipmentBySlug.get(favorite.equipmentSlug)!.id,
    })),
  });
}

async function seedReviews() {
  const reviews = buildReviewSeeds({
    clients: CLIENT_SEEDS,
    equipment: EQUIPMENT_SEEDS,
  });

  const usersByEmail = new Map(
    (
      await prisma.user.findMany({
        where: {
          email: {
            in: CLIENT_SEEDS.map((client) => client.email),
          },
        },
      })
    ).map((user) => [user.email, user]),
  );

  const equipmentBySlug = new Map(
    (
      await prisma.equipment.findMany({
        where: {
          slug: {
            in: reviews.map((review) => review.equipmentSlug),
          },
        },
      })
    ).map((equipment) => [equipment.slug, equipment]),
  );

  await prisma.review.createMany({
    data: reviews.map((review) => ({
      userId: usersByEmail.get(review.userEmail)!.id,
      equipmentId: equipmentBySlug.get(review.equipmentSlug)!.id,
      rating: review.rating,
      text: review.text,
      isPublished: review.isPublished,
    })),
  });
}

async function seedPayments(orderSeeds: ReturnType<typeof buildRentalOrderSeeds>["orders"]) {
  const payments = buildPaymentSeeds({ orders: orderSeeds });
  const ordersByNumber = new Map(
    (
      await prisma.rentalOrder.findMany({
        where: {
          orderNumber: {
            in: payments.map((payment) => payment.orderNumber),
          },
        },
      })
    ).map((order) => [order.orderNumber, order]),
  );

  await prisma.payment.createMany({
    data: payments.map((payment) => ({
      rentalOrderId: ordersByNumber.get(payment.orderNumber)!.id,
      amount: payment.amount,
      status: payment.status,
      method: payment.method,
      paidAt: payment.paidAt,
    })),
  });
}

async function seedReports(orderSeeds: ReturnType<typeof buildRentalOrderSeeds>["orders"]) {
  const reportSeeds = buildReportSeeds({
    adminEmail: process.env.ADMIN_EMAIL || ADMIN_SEED.email,
    clients: CLIENT_SEEDS,
    orders: orderSeeds,
  });

  const usersByEmail = new Map(
    (
      await prisma.user.findMany({
        where: {
          email: {
            in: [
              ...CLIENT_SEEDS.map((client) => client.email),
              process.env.ADMIN_EMAIL || ADMIN_SEED.email,
            ],
          },
        },
      })
    ).map((user) => [user.email, user]),
  );

  const ordersByNumber = new Map(
    (
      await prisma.rentalOrder.findMany({
        where: {
          orderNumber: {
            in: reportSeeds
              .map((report) => report.rentalOrderNumber)
              .filter((value): value is string => Boolean(value)),
          },
        },
      })
    ).map((order) => [order.orderNumber, order]),
  );

  await prisma.report.createMany({
    data: reportSeeds.map((report) => ({
      userId: usersByEmail.get(report.userEmail)!.id,
      rentalOrderId: report.rentalOrderNumber
        ? ordersByNumber.get(report.rentalOrderNumber)!.id
        : null,
      type: report.type,
      format: report.format,
      title: report.title,
      fileUrl: report.fileUrl,
    })),
  });
}

async function collectStats() {
  const [
    roles,
    users,
    categories,
    equipment,
    equipmentImages,
    equipmentSpecs,
    rentalOrders,
    rentalOrderItems,
    favorites,
    reviews,
    payments,
    reports,
  ] = await Promise.all([
    prisma.role.count(),
    prisma.user.count(),
    prisma.category.count(),
    prisma.equipment.count(),
    prisma.equipmentImage.count(),
    prisma.equipmentSpec.count(),
    prisma.rentalOrder.count(),
    prisma.rentalOrderItem.count(),
    prisma.favorite.count(),
    prisma.review.count(),
    prisma.payment.count(),
    prisma.report.count(),
  ]);

  const totalRecords =
    roles +
    users +
    categories +
    equipment +
    equipmentImages +
    equipmentSpecs +
    rentalOrders +
    rentalOrderItems +
    favorites +
    reviews +
    payments +
    reports;

  if (totalRecords < 350) {
    throw new Error(`Seed produced only ${totalRecords} records, expected at least 350.`);
  }

  return {
    roles,
    users,
    categories,
    equipment,
    equipmentImages,
    equipmentSpecs,
    rentalOrders,
    rentalOrderItems,
    favorites,
    reviews,
    payments,
    reports,
    totalRecords,
  };
}

async function main() {
  const { adminRole, clientRole } = await seedRoles();
  const { admin, clients } = await seedUsers({
    adminRoleId: adminRole.id,
    clientRoleId: clientRole.id,
  });

  await cleanupSmokeTestData();
  await seedCategories();
  const { orderSeeds } = await seedEquipment();

  await clearSeededRelationalData({
    clientIds: clients.map((client) => client.id),
    adminId: admin.id,
  });

  await seedOrders(orderSeeds);
  await seedFavorites();
  await seedReviews();
  await seedPayments(orderSeeds);
  await seedReports(orderSeeds);

  const stats = await collectStats();

  console.log("Seed completed:");
  console.log(`- roles: ${stats.roles}`);
  console.log(`- users: ${stats.users}`);
  console.log(`- categories: ${stats.categories}`);
  console.log(`- equipment: ${stats.equipment}`);
  console.log(`- equipmentImages: ${stats.equipmentImages}`);
  console.log(`- equipmentSpecs: ${stats.equipmentSpecs}`);
  console.log(`- rentalOrders: ${stats.rentalOrders}`);
  console.log(`- rentalOrderItems: ${stats.rentalOrderItems}`);
  console.log(`- favorites: ${stats.favorites}`);
  console.log(`- reviews: ${stats.reviews}`);
  console.log(`- payments: ${stats.payments}`);
  console.log(`- reports: ${stats.reports}`);
  console.log(`- total records: ${stats.totalRecords}`);
  console.log("");
  console.log("Seed accounts:");
  console.log(`- admin: ${admin.email} / ${process.env.ADMIN_PASSWORD || ADMIN_SEED.password}`);
  console.log(`- clients: ${CLIENT_SEEDS.length} accounts / ${CLIENT_PASSWORD}`);
  console.log(
    `- report formats present: ${[ReportFormat.PDF, ReportFormat.DOCX].join(", ")}`,
  );
  console.log(
    `- order statuses present: ${[
      OrderStatus.PENDING,
      OrderStatus.APPROVED,
      OrderStatus.ACTIVE,
      OrderStatus.COMPLETED,
      OrderStatus.CANCELLED,
      OrderStatus.REJECTED,
    ].join(", ")}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
