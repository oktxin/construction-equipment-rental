import {
  ReportFormat,
  ReportType,
  type OrderStatus,
  type Prisma,
} from "@prisma/client";

import type { RoleName } from "../auth/auth.types";

export type ReportsActor = {
  userId: string;
  role: RoleName;
};

export type ReportsListSortOrder = "asc" | "desc";

export type OrderReportPayload = {
  generatedAt: Date;
  title: string;
  order: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    startDate: Date;
    endDate: Date;
    deliveryType: string;
    deliveryAddress: string | null;
    customerComment: string | null;
    managerComment: string | null;
    subtotal: number;
    depositTotal: number;
    deliveryPrice: number;
    totalPrice: number;
    customer: {
      fullName: string;
      email: string;
      phone: string | null;
    };
    items: Array<{
      equipmentName: string;
      equipmentSlug: string;
      quantity: number;
      dailyPrice: number;
      daysCount: number;
      lineTotal: number;
    }>;
  };
};

export type RentalHistoryReportPayload = {
  generatedAt: Date;
  title: string;
  user: {
    fullName: string;
    email: string;
    phone: string | null;
  };
  period: {
    dateFrom: string | null;
    dateTo: string | null;
  };
  orders: Array<{
    orderNumber: string;
    status: OrderStatus;
    startDate: Date;
    endDate: Date;
    itemsCount: number;
    totalPrice: number;
  }>;
  totals: {
    ordersCount: number;
    grandTotal: number;
  };
};

export type AdminRentalStatisticsReportPayload = {
  generatedAt: Date;
  title: string;
  period: {
    dateFrom: string | null;
    dateTo: string | null;
  };
  summary: {
    ordersCount: number;
    totalRentalSum: number;
    totalDepositSum: number;
    completedCount: number;
    cancelledCount: number;
    activeCount: number;
  };
  byStatus: Array<{
    status: OrderStatus;
    count: number;
  }>;
  topEquipment: Array<{
    equipmentName: string;
    rentalsCount: number;
    quantityTotal: number;
  }>;
  topClients: Array<{
    clientName: string;
    clientEmail: string;
    ordersCount: number;
  }>;
};

export type GeneratedReportFile = {
  buffer: Buffer;
  extension: "pdf" | "docx";
  format: ReportFormat;
};

export type ReportListItem = {
  id: string;
  userId: string;
  rentalOrderId: string | null;
  type: ReportType;
  format: ReportFormat;
  title: string;
  fileUrl: string | null;
  downloadUrl: string;
  createdAt: Date;
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
  rentalOrder?: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
  } | null;
};

export type ReportWithRelations = Prisma.ReportGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        fullName: true;
        email: true;
      };
    };
    rentalOrder: {
      select: {
        id: true;
        orderNumber: true;
        status: true;
      };
    };
  };
}>;
