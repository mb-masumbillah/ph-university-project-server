import { Router } from 'express';
import { AdminController } from './admin.controller';

const router = Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getSingleAdmin);

export const AdminRouter = router;
