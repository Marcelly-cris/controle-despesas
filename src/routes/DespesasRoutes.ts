import { Router } from 'express';
import DespesasController from '../controller/DespesasController'; // Certifique-se de que o caminho está correto

const router = Router();

// Rota para criar uma nova despesa
router.post('/despesas', DespesasController.create);

// Rota para listar todas as despesas
router.get('/despesas', DespesasController.find);

// Rota para atualizar uma despesa existente
router.put('/despesas/:id', DespesasController.update);

// Rota para remover uma despesa pelo ID
router.delete('/despesas/:id', DespesasController.delete);

// Rota para calcular o total das despesas
router.get('/despesas/total', DespesasController.total);

export default router;
