import express from 'express';
import { createTarefa, getAllTarefas, getTarefaById, updateTarefa, deleteTarefa } from '../controllers/tarefaController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.route('/')
  .post(asyncHandler(createTarefa))
  .get(asyncHandler(getAllTarefas));

router.route('/:id')
  .get(asyncHandler(getTarefaById))
  .put(asyncHandler(updateTarefa))
  .delete(asyncHandler(deleteTarefa));

export default router;
