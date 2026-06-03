import type { StatusLabelKey } from "../../../shared/utils/statusLabels";

export const adminBadgeStyles = {
  neutral: "!border-white/25 !bg-white/[0.08] !text-[#F4EFE6]",
  accent: "!border-[rgba(242,165,49,0.32)] !bg-[rgba(242,165,49,0.16)] !text-[#FFE0AF]",
  success: "!border-[rgba(104,151,99,0.34)] !bg-[rgba(86,122,82,0.2)] !text-[#E4F1E1]",
  warning: "!border-[rgba(210,158,51,0.34)] !bg-[rgba(201,138,30,0.2)] !text-[#F7E3B2]",
  danger: "!border-[rgba(196,108,84,0.34)] !bg-[rgba(180,71,44,0.2)] !text-[#F8D4CA]",
  info: "!border-[rgba(124,149,189,0.34)] !bg-[rgba(83,112,156,0.2)] !text-[#E2EBF8]",
} as const;

export function getAdminStatusBadgeClassName(status: StatusLabelKey) {
  switch (status) {
    case "AVAILABLE":
    case "COMPLETED":
    case "PAID":
      return adminBadgeStyles.success;
    case "UNAVAILABLE":
    case "CANCELLED":
    case "REJECTED":
    case "FAILED":
      return adminBadgeStyles.danger;
    case "MAINTENANCE":
    case "PENDING":
    case "EQUIPMENT_UTILIZATION":
      return adminBadgeStyles.warning;
    case "APPROVED":
    case "ACTIVE":
    case "DELIVERY":
    case "ADMIN":
    case "ADMIN_RENTAL_STATISTICS":
      return adminBadgeStyles.accent;
    case "CLIENT":
    case "PICKUP":
    case "RENTAL_HISTORY":
    case "DOCX":
      return adminBadgeStyles.info;
    case "ORDER_DOCUMENT":
    case "ARCHIVED":
    case "DRAFT":
    case "REFUNDED":
    case "PDF":
    default:
      return adminBadgeStyles.neutral;
  }
}
