// backend/src/index.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./typeorm/data-source";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/transactions", transactionRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ Database connection error:", err));
