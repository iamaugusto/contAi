import { Router, RequestHandler } from "express";
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "../controllers/transactionController";

const router = Router();

router.get("/", getTransactions as unknown as RequestHandler);
router.post("/", createTransaction as unknown as RequestHandler);
router.delete("/:id", deleteTransaction as unknown as RequestHandler);

export default router;
