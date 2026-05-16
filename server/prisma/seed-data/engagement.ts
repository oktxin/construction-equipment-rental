import {
  EquipmentStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ReportFormat,
  ReportType,
} from "@prisma/client";

import type { SeedEquipment } from "./equipment";
import type { SeedRentalOrder } from "./rentalOrders";
import type { SeedClient } from "./users";

export type SeedFavorite = {
  userEmail: string;
  equipmentSlug: string;
};

export type SeedReview = {
  userEmail: string;
  equipmentSlug: string;
  rating: number;
  text: string;
  isPublished: boolean;
};

export type SeedPayment = {
  orderNumber: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  paidAt: Date | null;
};

export type SeedReport = {
  userEmail: string;
  rentalOrderNumber: string | null;
  type: ReportType;
  format: ReportFormat;
  title: string;
  fileUrl: string | null;
};

export function buildFavoriteSeeds(params: {
  clients: SeedClient[];
  equipment: SeedEquipment[];
}) {
  const favorites: SeedFavorite[] = [];
  const allowedEquipment = params.equipment.filter(
    (item) => item.status !== EquipmentStatus.ARCHIVED,
  );

  for (let index = 0; favorites.length < 30; index += 1) {
    const user = params.clients[index % params.clients.length];
    const equipment =
      allowedEquipment[(index * 3 + Math.floor(index / 2)) % allowedEquipment.length];

    if (
      favorites.some(
        (favorite) =>
          favorite.userEmail === user.email &&
          favorite.equipmentSlug === equipment.slug,
      )
    ) {
      continue;
    }

    favorites.push({
      userEmail: user.email,
      equipmentSlug: equipment.slug,
    });
  }

  return favorites;
}

export function buildReviewSeeds(params: {
  clients: SeedClient[];
  equipment: SeedEquipment[];
}) {
  const reviewTexts = [
    "The equipment arrived clean, started quickly, and worked through the whole shift without issues.",
    "Good condition overall. Delivery was on time and the machine handled our concrete work well.",
    "Reliable rental for a short project. Controls were easy to understand for the crew.",
    "Helped us finish the site work faster than expected. Would rent this model again.",
    "Solid choice for routine construction tasks. Support team answered setup questions quickly.",
    "Tool condition matched the description and the battery or fuel usage was reasonable on site.",
    "Very practical unit for our schedule. Pickup and return process was straightforward.",
    "Performance was stable even during longer use. No surprises during the rental window.",
  ];

  const reviews: SeedReview[] = [];
  const reviewableEquipment = params.equipment.filter(
    (item) => item.status !== EquipmentStatus.ARCHIVED,
  );

  for (let index = 0; reviews.length < 40; index += 1) {
    const user = params.clients[index % params.clients.length];
    const equipment =
      reviewableEquipment[(index * 4 + Math.floor(index / 3)) % reviewableEquipment.length];

    if (
      reviews.some(
        (review) =>
          review.userEmail === user.email &&
          review.equipmentSlug === equipment.slug,
      )
    ) {
      continue;
    }

    reviews.push({
      userEmail: user.email,
      equipmentSlug: equipment.slug,
      rating: 3 + (index % 3),
      text: reviewTexts[index % reviewTexts.length],
      isPublished: index % 5 !== 0,
    });
  }

  return reviews;
}

export function buildPaymentSeeds(params: { orders: SeedRentalOrder[] }) {
  const candidateOrders = params.orders.filter(
    (order) => order.status !== OrderStatus.REJECTED,
  );

  return candidateOrders.slice(0, 20).map((order, index): SeedPayment => {
    if (order.status === OrderStatus.CANCELLED) {
      return {
        orderNumber: order.orderNumber,
        amount: order.depositTotal,
        status: PaymentStatus.REFUNDED,
        method: PaymentMethod.CARD_MOCK,
        paidAt: new Date(`${order.startDate}T10:00:00.000Z`),
      };
    }

    if (order.status === OrderStatus.PENDING) {
      return {
        orderNumber: order.orderNumber,
        amount: order.totalPrice,
        status: index % 4 === 0 ? PaymentStatus.FAILED : PaymentStatus.PENDING,
        method:
          index % 3 === 0
            ? PaymentMethod.BANK_TRANSFER_MOCK
            : PaymentMethod.CARD_MOCK,
        paidAt: null,
      };
    }

    if (order.status === OrderStatus.APPROVED && index % 3 === 0) {
      return {
        orderNumber: order.orderNumber,
        amount: order.totalPrice,
        status: PaymentStatus.PENDING,
        method: PaymentMethod.BANK_TRANSFER_MOCK,
        paidAt: null,
      };
    }

    return {
      orderNumber: order.orderNumber,
      amount: order.totalPrice,
      status: PaymentStatus.PAID,
      method:
        index % 2 === 0 ? PaymentMethod.CARD_MOCK : PaymentMethod.CASH,
      paidAt: new Date(`${order.startDate}T08:30:00.000Z`),
    };
  });
}

export function buildReportSeeds(params: {
  adminEmail: string;
  clients: SeedClient[];
  orders: SeedRentalOrder[];
}) {
  const clientOrderReports = params.orders
    .filter((order) => order.status !== OrderStatus.REJECTED)
    .slice(0, 4)
    .map((order): SeedReport => ({
      userEmail: order.userEmail,
      rentalOrderNumber: order.orderNumber,
      type: ReportType.ORDER_DOCUMENT,
      format: order.orderNumber.endsWith("1") || order.orderNumber.endsWith("3")
        ? ReportFormat.PDF
        : ReportFormat.DOCX,
      title: `Seed: Order document ${order.orderNumber}`,
      fileUrl: null,
    }));

  const rentalHistoryReports = params.clients.slice(0, 3).map((client, index) => ({
    userEmail: client.email,
    rentalOrderNumber: null,
    type: ReportType.RENTAL_HISTORY,
    format: index % 2 === 0 ? ReportFormat.PDF : ReportFormat.DOCX,
    title: `Seed: Rental history ${client.fullName}`,
    fileUrl: null,
  }));

  const adminReports: SeedReport[] = [
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.ADMIN_RENTAL_STATISTICS,
      format: ReportFormat.PDF,
      title: "Seed: Admin rental statistics Q2",
      fileUrl: null,
    },
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.ADMIN_RENTAL_STATISTICS,
      format: ReportFormat.DOCX,
      title: "Seed: Admin rental statistics detailed export",
      fileUrl: null,
    },
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.EQUIPMENT_UTILIZATION,
      format: ReportFormat.PDF,
      title: "Seed: Equipment utilization snapshot",
      fileUrl: null,
    },
  ];

  return [...clientOrderReports, ...rentalHistoryReports, ...adminReports];
}
