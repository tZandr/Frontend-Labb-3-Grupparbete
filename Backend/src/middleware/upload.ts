import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

const AVATAR_UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads', 'avatars');
fs.mkdirSync(AVATAR_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, AVATAR_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const userId = (req as AuthRequest).user?.userId ?? 'unknown';
    const ext = path.extname(file.originalname);
    cb(null, `${userId}-${Date.now()}${ext}`);
  },
});

const avatarUpload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error('INVALID_FILE_TYPE'));
      return;
    }
    cb(null, true);
  },
}).single('photo');

export function handleAvatarUpload(req: AuthRequest, res: Response, next: NextFunction) {
  avatarUpload(req, res, (error: unknown) => {
    if (!error) return next();

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image must be smaller than 5MB.' });
    }
    if (error instanceof Error && error.message === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ message: 'Only JPEG, PNG, WEBP or GIF images are allowed.' });
    }

    console.error('Avatar upload failed:', error);
    return res.status(400).json({ message: 'Unable to process the uploaded file.' });
  });
}
