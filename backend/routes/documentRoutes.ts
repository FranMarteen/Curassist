import express from 'express';
const router = express.Router();
import { uploadDocument } from '../controllers/documentController';
import authMiddlewareWrapper from '../middlewares/authMiddlewareWrapper';

router.route('/upload').post(authMiddlewareWrapper, (req, res, next) => {
  uploadDocument(req, res, next);
});

export default router;
