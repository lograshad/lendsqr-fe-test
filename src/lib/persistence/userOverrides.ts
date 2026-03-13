import Dexie, { type EntityTable } from "dexie";
import type { UserOverrides } from "@/types/user";

const DB_NAME = "LendsqrUserOverrides";
const STORE_NAME = "userOverrides";

interface UserOverridesRecord {
  id: string;
  overrides: UserOverrides;
  updatedAt: string;
}

let db: (Dexie & { userOverrides: EntityTable<UserOverridesRecord, "id"> }) | null = null;
let dbOpen: Promise<void> | null = null;

function getDb(): (Dexie & { userOverrides: EntityTable<UserOverridesRecord, "id"> }) | null {
  if (typeof window === "undefined") return null;
  if (db) return db;
  try {
    db = new Dexie(DB_NAME) as Dexie & {
      userOverrides: EntityTable<UserOverridesRecord, "id">;
    };
    db.version(1).stores({
      [STORE_NAME]: "id, updatedAt",
    });
    return db;
  } catch {
    return null;
  }
}

async function ensureDbOpen(): Promise<boolean> {
  const database = getDb();
  if (!database) return false;
  if (!dbOpen) {
    dbOpen = database
      .open()
      .then(() => {})
      .catch(() => {
        db = null;
        dbOpen = null;
      });
  }
  await dbOpen;
  return db !== null;
}

const LS_PREFIX = "lendsqr:user:";

function localStorageGet(id: string): UserOverrides | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${id}`);
    if (!raw) return null;
    return JSON.parse(raw) as UserOverrides;
  } catch {
    return null;
  }
}

function localStorageSet(id: string, overrides: UserOverrides): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${LS_PREFIX}${id}`, JSON.stringify(overrides));
  } catch {
    // quota or disabled
  }
}

export async function saveUserOverrides(id: string, overrides: UserOverrides): Promise<void> {
  const opened = await ensureDbOpen();
  const record: UserOverridesRecord = {
    id,
    overrides,
    updatedAt: new Date().toISOString(),
  };
  if (opened && db) {
    try {
      await db.userOverrides.put(record);
      return;
    } catch {
      // fallback to localStorage
    }
  }
  localStorageSet(id, overrides);
}

export async function getUserOverrides(id: string): Promise<UserOverrides | null> {
  const opened = await ensureDbOpen();
  if (opened && db) {
    try {
      const record = await db.userOverrides.get(id);
      return record?.overrides ?? null;
    } catch {
      // fallback to localStorage
    }
  }
  return localStorageGet(id);
}
