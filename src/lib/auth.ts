const TOKEN_KEY = "lendsqr:token";
const USER_KEY = "lendsqr:user";

export interface User {
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function mockLogin(email: string, password: string): Promise<AuthResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const fakeToken = `mock-jwt-token-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const user: User = {
          email,
          name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        };

        localStorage.setItem(TOKEN_KEY, fakeToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        resolve({ token: fakeToken, user });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 800);
  });
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
