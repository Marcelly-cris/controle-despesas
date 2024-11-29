import { Request, Response } from 'express';
import {Despesa} from '../models/ExpenseCom'; // Certifique-se de que o caminho está correto

class DespesasController {
  // Criar uma nova despesa
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { descricao, valor, data } = req.body;
      const despesa = new Despesa({ descricao, valor, data });
      await despesa.save();
      res.status(201).json(despesa);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar despesa" });
    }
  }

  // Listar todas as despesas
  async find(req: Request, res: Response): Promise<void> {
    try {
      const despesas = await Despesa.find();
      res.json(despesas);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar despesas" });
    }
  }

  // Atualizar uma despesa
  async update(req: Request, res: Response): Promise<any> {
    try {
      const despesa = await Despesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      res.json(despesa);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar despesa" });
    }
  }

  // Excluir uma despesa
  async delete(req: Request, res: Response): Promise<any> {
    try {
      const despesa = await Despesa.findByIdAndDelete(req.params.id);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      res.json({ message: "Despesa excluída com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir despesa" });
    }
  }

  // Calcular o total das despesas
  async total(req: Request, res: Response): Promise<void> {
    try {
      const total = await Despesa.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$valor" } } }
      ]);
      res.json(total[0] || { totalAmount: 0 });
    } catch (error) {
      res.status(500).json({ message: "Erro ao calcular o total das despesas" });
    }
  }
}

export default new DespesasController();
