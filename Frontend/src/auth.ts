export const TOKEN_STORAGE_KEY = "bloom.auth.token";
export const USER_STORAGE_KEY = "bloom.auth.user";

export type AuthUser = { id: number; name: string; email: string };
export type LoginResponse = { token: string; user: AuthUser };

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json().catch(() => ({}))) as LoginResponse & { message?: string };

  if (!response.ok) throw new Error(data.message ?? "Unable to log in. Please try again.");
  if (!data.token || !data.user) throw new Error("The server returned an invalid login response.");

  localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
  return data;
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
}

export function getStoredUser(): AuthUser | null {
  const value = localStorage.getItem(USER_STORAGE_KEY);
  if (!value) return null;
  try { return JSON.parse(value) as AuthUser; } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}
