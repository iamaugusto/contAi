import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "../entities/Transaction";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "contai",
  synchronize: true, // trocar para false em produção
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
