import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { AppUser } from "@/types/user";
import { applyStatusOverrides } from "@/lib/server/userStatusOverrides";

const USERS_PATH = join(process.cwd(), "data", "users.json");

function loadUsers(): AppUser[] {
  const raw = readFileSync(USERS_PATH, "utf8");
  return JSON.parse(raw) as AppUser[];
}

export async function GET(request: NextRequest) {
  try {
    const users = applyStatusOverrides(loadUsers());
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10) || 20));
    const search = (searchParams.get("search") ?? "").trim().toLowerCase();
    const sortKey = searchParams.get("sort") ?? "createdAt";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc";
    const organization = (searchParams.get("organization") ?? "").trim();
    const fullName = (searchParams.get("fullName") ?? "").trim().toLowerCase();
    const email = (searchParams.get("email") ?? "").trim().toLowerCase();
    const phoneNumber = (searchParams.get("phoneNumber") ?? "").trim();
    const status = (searchParams.get("status") ?? "").trim();
    const dateFrom = (searchParams.get("dateFrom") ?? "").trim();
    const dateTo = (searchParams.get("dateTo") ?? "").trim();

    let filtered = users;
    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.fullName.toLowerCase().includes(search) ||
          u.email.toLowerCase().includes(search) ||
          u.phoneNumber.includes(search) ||
          (u.organization && u.organization.toLowerCase().includes(search))
      );
    }
    if (organization) {
      filtered = filtered.filter(
        (u) => u.organization && u.organization.toLowerCase().includes(organization.toLowerCase())
      );
    }
    if (fullName) {
      filtered = filtered.filter((u) => u.fullName.toLowerCase().includes(fullName));
    }
    if (email) {
      filtered = filtered.filter((u) => u.email.toLowerCase().includes(email));
    }
    if (phoneNumber) {
      filtered = filtered.filter((u) => u.phoneNumber.includes(phoneNumber));
    }
    if (status) {
      filtered = filtered.filter((u) => u.status === status);
    }
    if (dateFrom) {
      const from = Date.parse(dateFrom);
      if (!Number.isNaN(from)) {
        filtered = filtered.filter((u) => new Date(u.createdAt).getTime() >= from);
      }
    }
    if (dateTo) {
      const to = Date.parse(dateTo);
      if (!Number.isNaN(to)) {
        const toEndOfDay = new Date(to);
        toEndOfDay.setHours(23, 59, 59, 999);
        filtered = filtered.filter((u) => new Date(u.createdAt).getTime() <= toEndOfDay.getTime());
      }
    }

    const total = filtered.length;

    const sortKeys: (keyof AppUser)[] = [
      "id",
      "fullName",
      "email",
      "phoneNumber",
      "status",
      "createdAt",
      "organization",
    ];
    const key = sortKeys.includes(sortKey as keyof AppUser)
      ? (sortKey as keyof AppUser)
      : "createdAt";
    filtered = [...filtered].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return order === "asc" ? 1 : -1;
      if (bVal == null) return order === "asc" ? -1 : 1;
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return order === "asc" ? cmp : -cmp;
    });

    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return NextResponse.json({ data, total });
  } catch (err) {
    console.error("GET /api/users", err);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}
