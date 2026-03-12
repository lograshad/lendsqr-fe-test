"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { mockLogin, logout as authLogout, getToken, getUser, type User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getUser());
  const [token, setToken] = useState<string | null>(() => getToken());
  const isLoading = false;
  const router = useRouter();

  const login = useCallback(
    async (email: string, password: string) => {
      const { token: newToken, user: newUser } = await mockLogin(email, password);
      setToken(newToken);
      setUser(newUser);
      router.push("/");
    },
    [router]
  );

  const logout = useCallback(() => {
    authLogout();
    setToken(null);
    setUser(null);
    router.replace("/login");
  }, [router]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
