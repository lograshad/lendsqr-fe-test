import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { AppUser } from "@/types/user";

const USERS_PATH = join(process.cwd(), "data", "users.json");
const VALID_STATUSES = ["active", "inactive", "pending", "blacklisted"] as const;

function loadUsers(): AppUser[] {
  const raw = readFileSync(USERS_PATH, "utf8");
  return JSON.parse(raw) as AppUser[];
}

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const users = loadUsers();
    const user = users.find((u) => u.id === id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error("GET /api/users/[id]", err);
    return NextResponse.json({ error: "Failed to load user" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = typeof body?.status === "string" ? body.status.trim() : "";
    if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) {
      return NextResponse.json(
        { error: "Invalid status; must be one of: active, inactive, pending, blacklisted" },
        { status: 400 }
      );
    }
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    users[index] = { ...users[index], status: status as AppUser["status"] };
    writeFileSync(USERS_PATH, JSON.stringify(users, null, 2), "utf8");
    return NextResponse.json(users[index]);
  } catch (err) {
    console.error("PATCH /api/users/[id]", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
