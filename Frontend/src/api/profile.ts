import { TOKEN_STORAGE_KEY } from "../auth";

export type ProfileUser = {
  _id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
};

export type UpdateProfileInput = {
  name?: string;
  photo?: File;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function resolveAvatarUrl(avatarUrl?: string): string | null {
  if (!avatarUrl) return null;
  return `${apiOrigin}${avatarUrl}`;
}

export async function fetchMyProfile(): Promise<ProfileUser> {
  const response = await fetch(`${apiBaseUrl}/users/me`, { headers: authHeaders() });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? "Unable to load your profile.");
  return data as ProfileUser;
}

export async function updateMyProfile(input: UpdateProfileInput): Promise<ProfileUser> {
  const formData = new FormData();
  if (input.name) formData.append("name", input.name);
  if (input.photo) formData.append("photo", input.photo);

  const response = await fetch(`${apiBaseUrl}/users/me`, {
    method: "PUT",
    headers: authHeaders(),
    body: formData,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? "Unable to update your profile.");
  return data as ProfileUser;
}
