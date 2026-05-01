import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validators';
import { createItemSchema, updateItemSchema } from '../validators';

const router = Router();
const itemController = new ItemController();

// All routes require authentication
router.use(authenticate);

// Public for authenticated users
router.get('/', itemController.getAllItems);
router.get('/low-stock', itemController.getLowStockItems);
router.get('/:id', itemController.getItemById);

// Only ADMIN and MANAGER can create/update/delete items
router.post('/', authorize('ADMIN', 'MANAGER'), validate(createItemSchema), itemController.createItem);
router.put('/:id', authorize('ADMIN', 'MANAGER'), validate(updateItemSchema), itemController.updateItem);
router.delete('/:id', authorize('ADMIN', 'MANAGER'), itemController.deleteItem);

export default router;
