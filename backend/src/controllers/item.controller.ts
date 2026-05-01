import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { ItemService } from '../services/item.service';
import { createItemSchema, updateItemSchema } from '../validators';

const itemService = new ItemService();

export class ItemController {
  getAllItems = asyncHandler(async (req: Request, res: Response) => {
    const items = await itemService.getAllItems();
    
    res.json({
      success: true,
      data: items,
    });
  });

  getItemById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await itemService.getItemById(id);
    
    res.json({
      success: true,
      data: item,
    });
  });

  createItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = await createItemSchema.parseAsync(req.body);
    const item = await itemService.createItem(data);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  });

  updateItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const data = await updateItemSchema.parseAsync(req.body);
    const item = await itemService.updateItem(id, data);
    
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item,
    });
  });

  deleteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await itemService.deleteItem(id);
    
    res.json({
      success: true,
      message: 'Item deleted successfully',
    });
  });

  getLowStockItems = asyncHandler(async (req: Request, res: Response) => {
    const items = await itemService.getLowStockItems();
    
    res.json({
      success: true,
      data: items,
    });
  });
}
