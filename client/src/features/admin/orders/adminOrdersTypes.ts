import type {
  OrderStatus,
  RentalOrder,
  RentalOrdersResponse,
  RentalOrdersSortOrder,
  RentalOrdersSortBy,
} from "../../rentalOrders/rentalOrdersTypes";

export type AdminOrder = RentalOrder;
export type AdminOrdersResponse = RentalOrdersResponse;
export type AdminOrdersSortBy = RentalOrdersSortBy | "orderNumber";

export type AdminOrdersQueryParams = {
  status?: OrderStatus;
  search?: string;
  startDateFrom?: string;
  startDateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: AdminOrdersSortBy;
  sortOrder?: RentalOrdersSortOrder;
};

export type UpdateAdminOrderStatusPayload = {
  status: OrderStatus;
  managerComment?: string | null;
};

export type UpdateAdminOrderCommentPayload = {
  managerComment: string | null;
};

