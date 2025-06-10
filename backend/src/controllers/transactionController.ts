import { Request, Response } from "express";
import { AppDataSource } from "../typeorm/data-source";
import { Transaction } from "../entities/Transaction";

const repo = AppDataSource.getRepository(Transaction);

export async function getTransactions(req: Request, res: Response) {
  const all = await repo.find();
  return res.json(all);
}

export async function createTransaction(req: Request, res: Response) {
  const { date, description, amount, type } = req.body;

  if (!date || !description || !amount || !type) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const transaction = repo.create({ date, description, amount, type });
    await repo.save(transaction);
    return res.status(201).json(transaction);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao salvar transação" });
  }
}

export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await repo.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ error: "Transação não encontrada" });
    }
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Erro ao excluir transação" });
  }
}
