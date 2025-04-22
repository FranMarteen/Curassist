import express from 'express';
import { createObrigacao, getAllObrigacoes, getObrigacaoById, updateObrigacao, deleteObrigacao } from '../controllers/obrigacaoController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.route('/')
  .post(asyncHandler(createObrigacao))
  .get(asyncHandler(getAllObrigacoes));

router.route('/:id')
  .get(asyncHandler(getObrigacaoById))
  .put(asyncHandler(updateObrigacao))
  .delete(asyncHandler(deleteObrigacao));

export default router;
