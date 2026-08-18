import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { getMe, updateMe } from '../controllers/userController';
import { handleAvatarUpload } from '../middleware/upload';

const router = Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', handleAvatarUpload, updateMe);

export default router;
