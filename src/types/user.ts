export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

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

  accountBalance?: string;
  accountNumber?: string;
  bankName?: string;
  userTier?: number; // 1-3

  children?: string;
  typeOfResidence?: string;

  levelOfEducation?: string;
  employmentStatus?: string;
  sectorOfEmployment?: string;
  durationOfEmployment?: string;
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;

  twitter?: string;
  facebook?: string;
  instagram?: string;

  guarantors?: Guarantor[];
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
