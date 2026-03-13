import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { AppUser } from "@/types/user";

const USERS_PATH = join(process.cwd(), "data", "users.json");

export async function GET() {
  try {
    const raw = readFileSync(USERS_PATH, "utf8");
    const users = JSON.parse(raw) as AppUser[];
    const organizations = [
      ...new Set(
        users.map((u) => u.organization?.trim()).filter((org): org is string => Boolean(org))
      ),
    ].sort((a, b) => a.localeCompare(b));
    return NextResponse.json(organizations);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], { status: 500 });
  }
}
