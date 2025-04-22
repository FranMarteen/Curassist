// backend/routes/auth.ts
import express from 'express';
import { register, login, logout } from '../controllers/authController';
import asyncHandler from '../utils/asyncHandler';
import authMiddlewareWrapper from '../middlewares/authMiddlewareWrapper';

const router = express.Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/logout', authMiddlewareWrapper, asyncHandler(logout)); // Requires authentication

export default router;
