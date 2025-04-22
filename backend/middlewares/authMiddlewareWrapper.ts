import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import asyncHandler from '../utils/asyncHandler';

const authMiddlewareWrapper = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(req, res, next);
};

export default authMiddlewareWrapper;
