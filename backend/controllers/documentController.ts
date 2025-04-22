import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../utils/asyncHandler';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

interface MulterRequest extends Request {
  file: any;
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// @desc   Upload a document
// @route  POST /api/documents/upload
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// @access Private
export const uploadDocument = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  upload.single('document')(req as MulterRequest, res, async (err: any) => {
    if (err) {
      return next(err);
    }

    const { curateladoId } = req.body;
    if (!curateladoId) {
      return res.status(400).json({ message: 'Curatelado ID is required' });
    }

    if (!(req as MulterRequest).file?.filename || !(req as MulterRequest).file?.path) {
      return res.status(500).json({ message: 'File not uploaded correctly' });
    }

    const { filename, path } = (req as MulterRequest).file;

    // Save file information to the database
    const document = await prisma.document.create({
      data: {
        filename: filename,
        filepath: path,
        curateladoId: curateladoId,
      },
    });

    res.status(200).json({ message: 'File uploaded successfully', filename: filename, documentId: document.id });
  });
});
