import type { AppUser } from "@/types/user";

/**
 * this is an-memory status overrides so PATCH works on read-only hosts (e.g. Vercel).
 * Locally I also try to persist to data/users.json; on Vercel the write fails and I rely on this store for the lifetime of the serverless instance.
 */
const overrides = new Map<string, AppUser["status"]>();

export function getStatusOverride(id: string): AppUser["status"] | undefined {
  return overrides.get(id);
}

export function setStatusOverride(id: string, status: AppUser["status"]): void {
  overrides.set(id, status);
}

export function applyStatusOverrides(users: AppUser[]): AppUser[] {
  return users.map((u) => {
    const status = overrides.get(u.id);
    return status !== undefined ? { ...u, status } : u;
  });
}
