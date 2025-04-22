// backend/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
 const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    res.status(201).send('User registered successfully');
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
 const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.send('Logout endpoint'); // Implement actual logout logic if needed (e.g., token invalidation)
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
