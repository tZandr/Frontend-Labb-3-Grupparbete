import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { saveTodaysLog, getLogs, getLogById, updateLog, deleteLog } from '../services/healthentryService';
import { LOG_CATEGORIES, LogCategory } from '../types/logTypes';

function isValidRating(value: unknown): value is number {
  return typeof value === 'number' && value >= 1 && value <= 5;
}

function isValidCategory(value: unknown): value is LogCategory {
  return typeof value === 'string' && (LOG_CATEGORIES as readonly string[]).includes(value);
}

export async function createLog(req: AuthRequest, res: Response) {
  try {
    const { energyLevel, moodLevel, sleepLevel, category, note } = req.body;

    if (!isValidRating(energyLevel) || !isValidRating(moodLevel) || !isValidRating(sleepLevel)) {
      return res.status(400).json({ message: 'Energy, mood and sleep must each be a number from 1 to 5' });
    }
    if (!isValidCategory(category)) {
      return res.status(400).json({ message: 'A valid category is required' });
    }

    const { log, updatedExisting } = await saveTodaysLog(req.user!.userId, {
      energyLevel,
      moodLevel,
      sleepLevel,
      category,
      note,
    });

    return res.status(updatedExisting ? 200 : 201).json({
      log,
      updatedExisting,
      message: updatedExisting
        ? "You've already logged today — this updated today's entry."
        : 'Log saved successfully!',
    });
  } catch (error) {
    console.error('Failed to save log:', error);
    return res.status(500).json({ message: 'Unable to save your log right now. Please try again.' });
  }
}

export async function listLogs(req: AuthRequest, res: Response) {
  try {
    const logs = await getLogs(req.user!.userId);
    return res.status(200).json(logs);
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return res.status(500).json({ message: 'Unable to load logs right now.' });
  }
}

export async function getLog(req: AuthRequest, res: Response) {
  try {
    const log = await getLogById(req.user!.userId, String(req.params.id));
    return res.status(200).json(log);
  } catch (error) {
    if (error instanceof Error && error.message === 'LOG_NOT_FOUND') {
      return res.status(404).json({ message: 'Log entry not found' });
    }
    return res.status(400).json({ message: 'Invalid log id' });
  }
}

export async function editLog(req: AuthRequest, res: Response) {
  try {
    const { energyLevel, moodLevel, sleepLevel, category, note } = req.body;
    const data: Record<string, unknown> = {};

    if (energyLevel !== undefined) {
      if (!isValidRating(energyLevel)) return res.status(400).json({ message: 'Energy must be a number from 1 to 5' });
      data.energyLevel = energyLevel;
    }
    if (moodLevel !== undefined) {
      if (!isValidRating(moodLevel)) return res.status(400).json({ message: 'Mood must be a number from 1 to 5' });
      data.moodLevel = moodLevel;
    }
    if (sleepLevel !== undefined) {
      if (!isValidRating(sleepLevel)) return res.status(400).json({ message: 'Sleep must be a number from 1 to 5' });
      data.sleepLevel = sleepLevel;
    }
    if (category !== undefined) {
      if (!isValidCategory(category)) return res.status(400).json({ message: 'A valid category is required' });
      data.category = category;
    }
    if (note !== undefined) data.note = note;

    const log = await updateLog(req.user!.userId, String(req.params.id), data);
    return res.status(200).json(log);
  } catch (error) {
    if (error instanceof Error && error.message === 'LOG_NOT_FOUND') {
      return res.status(404).json({ message: 'Log entry not found' });
    }
    return res.status(400).json({ message: 'Invalid log id' });
  }
}

export async function removeLog(req: AuthRequest, res: Response) {
  try {
    await deleteLog(req.user!.userId, String(req.params.id));
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'LOG_NOT_FOUND') {
      return res.status(404).json({ message: 'Log entry not found' });
    }
    return res.status(400).json({ message: 'Invalid log id' });
  }
}
