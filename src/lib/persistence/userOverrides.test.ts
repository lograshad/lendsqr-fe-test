import { saveUserOverrides, getUserOverrides } from "./userOverrides";
import type { UserOverrides } from "@/types/user";

const mockPut = jest.fn();
const mockGet = jest.fn();

jest.mock("dexie", () => {
  return jest.fn().mockImplementation(() => {
    return {
      version: () => ({
        stores: () => {},
      }),
      userOverrides: {
        put: (...args: unknown[]) => mockPut(...args),
        get: (...args: unknown[]) => mockGet(...args),
      },
      open: () => Promise.resolve(),
    };
  });
});

describe("userOverrides persistence", () => {
  const overrides: UserOverrides = {
    email: "updated@example.com",
    phoneNumber: "1234567890",
    fullName: "Updated Name",
    status: "active",
  };

  beforeEach(() => {
    mockPut.mockReset();
    mockGet.mockReset();
    // Clear localStorage
    if (typeof window !== "undefined") {
      window.localStorage.clear();
    }
  });

  it("saves overrides to IndexedDB via Dexie", async () => {
    await saveUserOverrides("1", overrides);

    expect(mockPut).toHaveBeenCalledTimes(1);
    const record = mockPut.mock.calls[0][0];
    expect(record).toMatchObject({
      id: "1",
      overrides,
    });
  });

  it("falls back to localStorage when Dexie put throws", async () => {
    mockPut.mockRejectedValueOnce(new Error("dexie error"));

    await saveUserOverrides("1", overrides);

    const stored = window.localStorage.getItem("lendsqr:user:1");
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).toEqual(overrides);
  });

  it("reads overrides from IndexedDB when available", async () => {
    mockGet.mockResolvedValueOnce({
      id: "1",
      overrides,
      updatedAt: new Date().toISOString(),
    });

    const result = await getUserOverrides("1");
    expect(result).toEqual(overrides);
  });

  it("falls back to localStorage when IndexedDB read fails", async () => {
    mockGet.mockRejectedValueOnce(new Error("dexie error"));
    window.localStorage.setItem("lendsqr:user:1", JSON.stringify(overrides));

    const result = await getUserOverrides("1");
    expect(result).toEqual(overrides);
  });
});
