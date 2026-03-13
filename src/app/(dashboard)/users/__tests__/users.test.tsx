import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UsersPage from "../page";
import type { AppUser } from "@/types/user";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

const mockGetUsers = jest.fn();
const mockGetOrganizations = jest.fn();

jest.mock("@/lib/api/users", () => ({
  getUsers: (...args: unknown[]) => mockGetUsers(...args),
  getOrganizations: (...args: unknown[]) => mockGetOrganizations(...args),
  getUserById: jest.fn(),
  updateUserStatus: jest.fn(),
}));

function createMockUser(overrides: Partial<AppUser> = {}): AppUser {
  return {
    id: "1",
    fullName: "Test User",
    email: "test@example.com",
    phoneNumber: "08012345678",
    status: "active",
    createdAt: new Date().toISOString(),
    organization: "Test Org",
    ...overrides,
  };
}

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe("UsersPage", () => {
  beforeEach(() => {
    mockGetUsers.mockReset();
    mockGetOrganizations.mockReset();
    mockGetOrganizations.mockResolvedValue([]);
  });

  it("shows error state and Retry when getUsers fails", async () => {
    mockGetUsers.mockRejectedValue(new Error("Failed to load users"));

    render(<UsersPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole("button", { name: /retry/i });
    expect(retryButton).toBeInTheDocument();
  });

  it("shows users table and pagination when getUsers succeeds", async () => {
    const mockUsers = [
      createMockUser({ id: "1", fullName: "Alice" }),
      createMockUser({ id: "2", fullName: "Bob" }),
    ];
    mockGetUsers.mockResolvedValue({ data: mockUsers, total: 2 });

    render(<UsersPage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
  });
});
