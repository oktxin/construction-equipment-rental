import type { AuthUser } from "../../shared/types/auth";

export type ProfileUpdatePayload = {
  fullName?: string;
  phone?: string | null;
  avatarUrl?: string | null;
};

export type ProfileUpdateResponse = AuthUser;
