import type { AppUser } from "@/types/user";

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
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
  const { page, limit, search, sort = "createdAt", order = "desc" } = params;
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("limit", String(limit));
  if (search) searchParams.set("search", search);
  searchParams.set("sort", sort);
  searchParams.set("order", order);

  const res = await fetch(`/api/users?${searchParams}`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json() as Promise<GetUsersResponse>;
}
