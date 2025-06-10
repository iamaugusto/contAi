import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column()
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: ["credit", "debit"] })
  type: "credit" | "debit";

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
