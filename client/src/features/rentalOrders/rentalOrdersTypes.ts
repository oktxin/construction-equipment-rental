import type { EquipmentImage, PaginationMeta } from "../catalog/catalogTypes";

export type DeliveryType = "PICKUP" | "DELIVERY";
export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export type RentalOrderCalculateRequest = {
  startDate: string;
  endDate: string;
  deliveryType: DeliveryType;
  items: Array<{
    equipmentId: string;
    quantity: number;
  }>;
};

export type RentalOrderCalculateResponse = {
  daysCount: number;
  currency: "BYN";
  deliveryType: DeliveryType;
  subtotal: number;
  depositTotal: number;
  deliveryPrice: number;
  totalPrice: number;
  items: Array<{
    equipmentId: string;
    name: string;
    slug: string;
    brand: string | null;
    model: string | null;
    quantity: number;
    dailyPrice: number;
    depositAmount: number;
    daysCount: number;
    subtotal: number;
    depositTotal: number;
    lineTotal: number;
  }>;
};

export type CreateRentalOrderRequest = {
  startDate: string;
  endDate: string;
  deliveryType: DeliveryType;
  deliveryAddress?: string | null;
  customerComment?: string | null;
  items: Array<{
    equipmentId: string;
    quantity: number;
  }>;
};

export type RentalOrderItem = {
  id: string;
  equipmentId: string;
  quantity: number;
  dailyPrice: number;
  daysCount: number;
  lineTotal: number;
  equipment: {
    id: string;
    name: string;
    slug: string;
    brand: string | null;
    model: string | null;
    status: string;
    quantityAvailable: number;
    category: {
      id: string;
      name: string;
      slug: string;
    };
    mainImage: EquipmentImage | null;
  };
};

export type RentalOrder = {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  daysCount: number;
  deliveryType: DeliveryType;
  deliveryAddress: string | null;
  customerComment: string | null;
  managerComment: string | null;
  subtotal: number;
  depositTotal: number;
  deliveryPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
  };
  items: RentalOrderItem[];
};

export type RentalOrdersResponse = {
  items: RentalOrder[];
  pagination: PaginationMeta;
};

export type RentalOrdersQueryParams = {
  status?: OrderStatus;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "startDate" | "totalPrice" | "status";
  sortOrder?: "asc" | "desc";
};
