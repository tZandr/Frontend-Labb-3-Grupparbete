import { TOKEN_STORAGE_KEY } from "../auth";

export const LOG_CATEGORIES = ["Mindfulness", "Movement", "Nutrition"] as const;
export type LogCategory = (typeof LOG_CATEGORIES)[number];

export type LogEntry = {
  _id: string;
  userId: string;
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  focusAreas: LogCategory[];
  note?: string;
  created_at: string;
  updated_at: string;
};

export type LogInput = {
  energyLevel: number;
  moodLevel: number;
  sleepLevel: number;
  focusAreas: LogCategory[];
  note?: string;
};

export type SaveLogResult = {
  log: LogEntry;
  updatedExisting: boolean;
  message: string;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers ?? {}) },
  });

  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? "Something went wrong. Please try again.");
  return data as T;
}

export function fetchLogs(): Promise<LogEntry[]> {
  return request<LogEntry[]>("/logs");
}

export function fetchLog(id: string): Promise<LogEntry> {
  return request<LogEntry>(`/logs/${id}`);
}

export function saveTodaysLog(input: LogInput): Promise<SaveLogResult> {
  return request<SaveLogResult>("/logs", { method: "POST", body: JSON.stringify(input) });
}

export function updateLog(id: string, input: Partial<LogInput>): Promise<LogEntry> {
  return request<LogEntry>(`/logs/${id}`, { method: "PUT", body: JSON.stringify(input) });
}

export function deleteLog(id: string): Promise<void> {
  return request<void>(`/logs/${id}`, { method: "DELETE" });
}
