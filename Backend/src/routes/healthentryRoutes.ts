import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { createLog, listLogs, getLog, editLog, removeLog } from '../controllers/healthentryController';

const router = Router();

router.use(protect);

router.post('/', createLog);
router.get('/', listLogs);
router.get('/:id', getLog);
router.put('/:id', editLog);
router.delete('/:id', removeLog);

export default router;
