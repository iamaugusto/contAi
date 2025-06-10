"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const ormconfig_1 = require("../ormconfig");
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/transactions", transactionRoutes_1.default);
ormconfig_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
