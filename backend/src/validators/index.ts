import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'MANAGER', 'ACCOUNTANT', 'USER']).optional(),
});

export const createItemSchema = z.object({
  sku: z.string().min(1, 'SKU is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  categoryId: z.string().uuid('Invalid category ID'),
  unitPrice: z.number().positive('Unit price must be positive'),
  costPrice: z.number().positive('Cost price must be positive'),
  stock: z.number().int().nonnegative('Stock must be non-negative').optional(),
  minStock: z.number().int().nonnegative('Min stock must be non-negative').optional(),
  maxStock: z.number().int().positive('Max stock must be positive').optional(),
});

export const updateItemSchema = createItemSchema.partial();

export const createSaleSchema = z.object({
  customerId: z.string().uuid('Invalid customer ID'),
  items: z.array(z.object({
    itemId: z.string().uuid('Invalid item ID'),
    quantity: z.number().int().positive('Quantity must be positive'),
  })).min(1, 'At least one item is required'),
  discount: z.number().nonnegative('Discount must be non-negative').optional(),
  notes: z.string().optional(),
});

export const createPurchaseSchema = z.object({
  supplierId: z.string().uuid('Invalid supplier ID'),
  items: z.array(z.object({
    itemId: z.string().uuid('Invalid item ID'),
    quantity: z.number().int().positive('Quantity must be positive'),
    unitPrice: z.number().positive('Unit price must be positive'),
  })).min(1, 'At least one item is required'),
  discount: z.number().nonnegative('Discount must be non-negative').optional(),
  notes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type CreatePurchaseInput = z.infer<typeof createPurchaseSchema>;
