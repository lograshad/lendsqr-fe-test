import { z } from "zod";
import type { UserOverrides } from "@/types/user";

export const userDetailsSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Enter a valid email"),
  phoneNumber: z
    .string()
    .regex(/^0\d{10}$/, "Enter a valid 11-digit Nigerian phone number starting with 0"),
  status: z.enum(["active", "inactive", "pending", "blacklisted"]),
  organization: z.string().optional(),
  bvn: z.string().min(10, "BVN must be 10 digits").max(10, "BVN must be 10 digits").optional(),
  gender: z
    .union([z.enum(["male", "female"]), z.literal("")])
    .transform((v) => (v === "" ? undefined : v)),
  maritalStatus: z
    .union([z.enum(["single", "married", "divorced", "widowed"]), z.literal("")])
    .transform((v) => (v === "" ? undefined : v)),
});

export type UserDetailsFormData = z.infer<typeof userDetailsSchema>;

export function formDataToOverrides(data: UserDetailsFormData): UserOverrides {
  return {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    status: data.status,
    organization: data.organization || undefined,
    bvn: data.bvn || undefined,
    gender: data.gender || undefined,
    maritalStatus: data.maritalStatus || undefined,
  };
}
