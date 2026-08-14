import { LogModel } from '../types/logTypes';
import type { LogEntry, LogInput } from '../types/logTypes';

function startOfDay(date: Date): Date {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
}

function endOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

export async function saveTodaysLog(
  userId: string,
  data: LogInput,
): Promise<{ log: LogEntry; updatedExisting: boolean }> {
  const now = new Date();

  const existing = await LogModel.findOne({
    userId,
    created_at: { $gte: startOfDay(now), $lte: endOfDay(now) },
  });

  if (existing) {
    existing.set({ ...data, updated_at: now });
    await existing.save();
    return { log: existing, updatedExisting: true };
  }

  const log = await LogModel.create({ userId, ...data, created_at: now, updated_at: now });
  return { log, updatedExisting: false };
}

export async function getLogs(userId: string): Promise<LogEntry[]> {
  return LogModel.find({ userId }).sort({ created_at: -1 });
}

export async function getLogById(userId: string, logId: string): Promise<LogEntry> {
  const log = await LogModel.findOne({ _id: logId, userId });
  if (!log) throw new Error('LOG_NOT_FOUND');
  return log;
}

export async function updateLog(
  userId: string,
  logId: string,
  data: Partial<LogInput>,
): Promise<LogEntry> {
  const log = await LogModel.findOneAndUpdate(
    { _id: logId, userId },
    { ...data, updated_at: new Date() },
    { new: true, runValidators: true },
  );
  if (!log) throw new Error('LOG_NOT_FOUND');
  return log;
}

export async function deleteLog(userId: string, logId: string): Promise<void> {
  const log = await LogModel.findOneAndDelete({ _id: logId, userId });
  if (!log) throw new Error('LOG_NOT_FOUND');
}
