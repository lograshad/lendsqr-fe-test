import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import LoginPage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const loginMock = jest.fn();

jest.mock("@/context/AuthContext", () => {
  return {
    useAuth: () => ({
      login: loginMock,
      isAuthenticated: false,
      isLoading: false,
    }),
  };
});

function renderLogin(ui?: ReactNode) {
  return render(<>{ui ?? <LoginPage />}</>);
}

describe("LoginPage", () => {
  beforeEach(() => {
    loginMock.mockReset();
  });

  it("shows validation errors for empty submit", async () => {
    renderLogin();

    const submit = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(submit);

    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });

  it("does not call login when email format is invalid", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "notanemail" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    const submit = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(loginMock).not.toHaveBeenCalled();
    });
  });

  it("calls login on valid credentials", async () => {
    loginMock.mockResolvedValueOnce(undefined);

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    const submit = screen.getByRole("button", { name: /log in/i });
    fireEvent.click(submit);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("user@example.com", "password123");
    });
  });
});
