import express from 'express';
const router = express.Router();
import {
  criarCuratelado,
  obterCuratelado,
  atualizarCuratelado,
  deletarCuratelado,
  obterTodosCuratelados,
} from '../controllers/curateladoController';

router.route('/').post(criarCuratelado).get(obterTodosCuratelados);
router.route('/:id').get(obterCuratelado).put(atualizarCuratelado).delete(deletarCuratelado);

export default router;
