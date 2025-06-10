"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("../../ormconfig");
const Transaction_1 = require("../entities/Transaction");
const router = express_1.default.Router();
const repo = ormconfig_1.AppDataSource.getRepository(Transaction_1.Transaction);
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, description, amount, type } = req.body;
        if (!date ||
            !description ||
            !amount ||
            !["credit", "debit"].includes(type)) {
            res.status(400).json({ message: "Invalid data" });
            return;
        }
        const transaction = repo.create({ date, description, amount, type });
        yield repo.save(transaction);
        res.status(201).json(transaction);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}));
// GET: Listar todos os lançamentos
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield repo.find({
            order: { date: "ASC" },
        });
        res.json(transactions);
    }
    catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ message: "Server error" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield repo.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: "Transaction not found" });
            return;
        }
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}));
exports.default = router;
