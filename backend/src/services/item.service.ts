import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { CreateItemInput, UpdateItemInput } from '../validators';

export class ItemService {
  async getAllItems() {
    return await prisma.item.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getItemById(id: string) {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    return item;
  }

  async createItem(data: CreateItemInput) {
    // Check if SKU already exists
    const existing = await prisma.item.findUnique({
      where: { sku: data.sku },
    });

    if (existing) {
      throw new AppError('SKU already exists', 409);
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return await prisma.item.create({
      data,
      include: {
        category: true,
      },
    });
  }

  async updateItem(id: string, data: UpdateItemInput) {
    // Verify item exists
    const existing = await prisma.item.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Item not found', 404);
    }

    // If SKU is being updated, check for duplicates
    if (data.sku && data.sku !== existing.sku) {
      const duplicate = await prisma.item.findUnique({
        where: { sku: data.sku },
      });

      if (duplicate) {
        throw new AppError('SKU already exists', 409);
      }
    }

    // If categoryId is being updated, verify it exists
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new AppError('Category not found', 404);
      }
    }

    return await prisma.item.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });
  }

  async deleteItem(id: string) {
    const existing = await prisma.item.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError('Item not found', 404);
    }

    await prisma.item.delete({
      where: { id },
    });

    return { message: 'Item deleted successfully' };
  }

  async getLowStockItems() {
    return await prisma.item.findMany({
      where: {
        stock: {
          lte: prisma.item.fields.minStock,
        },
      },
      include: {
        category: true,
      },
    });
  }
}
