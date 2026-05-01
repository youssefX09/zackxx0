import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthService } from '../services/auth.service';
import { loginSchema, registerSchema } from '../validators';
import { validate } from '../middleware/validators';

const authService = new AuthService();

export class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const data = await loginSchema.parseAsync(req.body);
    const result = await authService.login(data);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const data = await registerSchema.parseAsync(req.body);
    const result = await authService.register(data);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    
    const user = await authService.getProfile(req.user.id);
    
    res.json({
      success: true,
      data: user,
    });
  });
}
