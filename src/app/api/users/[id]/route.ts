import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { AppUser } from "@/types/user";

const USERS_PATH = join(process.cwd(), "data", "users.json");

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
