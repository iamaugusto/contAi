export type TransactionType = "credit" | "debit";

export interface Transaction {
  id?: number;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
}
