export interface AppUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  createdAt: string;
  organization?: string;
  bvn?: string;
  gender?: string;
  maritalStatus?: string;
}

export type AppUserStatus = AppUser["status"];

export type UserOverrides = Partial<
  Pick<
    AppUser,
    | "fullName"
    | "email"
    | "phoneNumber"
    | "status"
    | "organization"
    | "bvn"
    | "gender"
    | "maritalStatus"
  >
>;
