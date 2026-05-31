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
    "Техника приехала чистой, быстро запустилась и спокойно отработала всю смену без сбоев.",
    "Состояние хорошее, доставка была вовремя, оборудование уверенно справилось с задачами по бетону.",
    "Надёжная аренда для короткого проекта. Бригада быстро разобралась с управлением.",
    "Помогли закончить работы быстрее, чем планировали. Эту модель взяли бы ещё раз.",
    "Хороший вариант для типовых строительных задач. Поддержка быстро ответила на вопросы по запуску.",
    "Состояние полностью соответствовало описанию, расход топлива и ресурса оказался предсказуемым.",
    "Практичная позиция под плотный график. Выдача и возврат прошли без лишних задержек.",
    "Оборудование стабильно работало даже при длительной нагрузке. В аренде всё прошло спокойно.",
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
      title: `Документ по заявке ${order.orderNumber}`,
      fileUrl: null,
    }));

  const rentalHistoryReports = params.clients.slice(0, 3).map((client, index) => ({
    userEmail: client.email,
    rentalOrderNumber: null,
    type: ReportType.RENTAL_HISTORY,
    format: index % 2 === 0 ? ReportFormat.PDF : ReportFormat.DOCX,
    title: `История аренды: ${client.fullName}`,
    fileUrl: null,
  }));

  const adminReports: SeedReport[] = [
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.ADMIN_RENTAL_STATISTICS,
      format: ReportFormat.PDF,
      title: "Статистика аренды за квартал",
      fileUrl: null,
    },
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.ADMIN_RENTAL_STATISTICS,
      format: ReportFormat.DOCX,
      title: "Статистика аренды: подробная выгрузка",
      fileUrl: null,
    },
    {
      userEmail: params.adminEmail,
      rentalOrderNumber: null,
      type: ReportType.EQUIPMENT_UTILIZATION,
      format: ReportFormat.PDF,
      title: "Сводка по использованию оборудования",
      fileUrl: null,
    },
  ];

  return [...clientOrderReports, ...rentalHistoryReports, ...adminReports];
}
