import type { AppUser } from "@/types/user";

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  organization?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface GetUsersResponse {
  data: AppUser[];
  total: number;
}

export async function getUserById(id: string): Promise<AppUser> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    throw new Error(res.status === 404 ? "User not found" : "Failed to load user");
  }
  const data = await res.json();
  return data as AppUser;
}

export async function getUsers(params: GetUsersParams): Promise<GetUsersResponse> {
  const {
    page,
    limit,
    search,
    sort = "createdAt",
    order = "desc",
    organization,
    fullName,
    email,
    phoneNumber,
    status,
    dateFrom,
    dateTo,
  } = params;
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);
  searchParams.set("sort", sort);
  searchParams.set("order", order);
  if (organization) searchParams.set("organization", organization);
  if (fullName) searchParams.set("fullName", fullName);
  if (email) searchParams.set("email", email);
  if (phoneNumber) searchParams.set("phoneNumber", phoneNumber);
  if (status) searchParams.set("status", status);
  if (dateFrom) searchParams.set("dateFrom", dateFrom);
  if (dateTo) searchParams.set("dateTo", dateTo);

  const res = await fetch(`/api/users?${searchParams}`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json() as Promise<GetUsersResponse>;
}

export async function getOrganizations(): Promise<string[]> {
  const res = await fetch("/api/users/organizations");
  if (!res.ok) return [];
  return res.json() as Promise<string[]>;
}

export async function updateUserStatus(
  userId: string,
  status: AppUser["status"]
): Promise<AppUser> {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json() as Promise<AppUser>;
}
