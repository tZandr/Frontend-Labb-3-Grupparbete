import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { getUserById, updateUser } from '../services/userService';

export async function getMe(req: AuthRequest, res: Response) {
  try {
    const user = await getUserById(req.user!.userId);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Failed to fetch profile:', error);
    return res.status(500).json({ message: 'Unable to load your profile right now.' });
  }
}

export async function updateMe(req: AuthRequest, res: Response) {
  try {
    const data: { name?: string; avatar_url?: string } = {};

    if (typeof req.body.name === 'string' && req.body.name.trim()) {
      data.name = req.body.name.trim();
    }
    if (req.file) {
      data.avatar_url = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await updateUser(req.user!.userId, data);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ message: 'User not found' });
    }
    console.error('Failed to update profile:', error);
    return res.status(500).json({ message: 'Unable to update your profile right now.' });
  }
}
