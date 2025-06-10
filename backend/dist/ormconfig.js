"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Transaction_1 = require("./src/entities/Transaction");
require("dotenv/config");
// Verifica se é ambiente Docker
const isDocker = process.env.DOCKER_ENV === "true";
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "contal",
    entities: [Transaction_1.Transaction],
    migrations: ["./src/migrations/*.ts"],
    logging: true,
    synchronize: true, // Only for development
    ssl: false,
    extra: {
        trustServerCertificate: true,
    },
});
