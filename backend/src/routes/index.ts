import { Router } from 'express';
import authRoutes from './auth.routes';
import itemRoutes from './item.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
// TODO: Add sales routes
// TODO: Add purchases routes
// TODO: Add customers routes
// TODO: Add suppliers routes
// TODO: Add categories routes
// TODO: Add reports routes

export default router;
