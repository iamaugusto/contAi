import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  PencilIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const transactionSchema = z.object({
  date: z
    .string()
    .trim()
    .min(1, "Campo obrigatório")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido (YYYY-MM-DD)"),

  description: z.string().min(1, "Campo obrigatório"),
  amount: z.number().positive("Deve ser um valor positivo"),
  type: z.enum(["credit", "debit"], {
    errorMap: () => ({ message: "Selecione um tipo" }),
  }),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function TransactionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
  });

  const API_URL = "http://localhost:3001";

  const onSubmit = async (data: TransactionFormData) => {
    try {
      setIsSubmitting(true);
      await axios.post(`${API_URL}/transactions`, data);
      reset();
      toast.success("Lançamento salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast.error("Falha ao salvar o lançamento");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6 bg-transparent dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-blue-700/40"
    >
      {/* Campo Data */}
      <div className="relative">
        <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
          Data
        </label>
        <div className="relative">
          <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="date"
            {...register("date")}
            className={`w-full pl-10 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.date
                ? "border-red-500"
                : "border-blue-300 dark:border-blue-600"
            }`}
          />
          {errors.date && (
            <ExclamationCircleIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          )}
        </div>
        <AnimatePresence>
          {errors.date && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.date.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Descrição */}
      <div className="relative">
        <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
          Descrição
        </label>
        <div className="relative">
          <PencilIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            {...register("description")}
            placeholder="Ex: Compra no supermercado"
            className={`w-full pl-10 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description
                ? "border-red-500"
                : "border-blue-300 dark:border-blue-600"
            }`}
          />
          {errors.description && (
            <ExclamationCircleIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          )}
        </div>
        <AnimatePresence>
          {errors.description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.description.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Valor */}
      <div className="relative">
        <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
          Valor
        </label>
        <div className="relative">
          <CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="text"
            {...register("amount", {
              setValueAs: (v) => parseFloat(v.replace(/\D/g, "")) / 100,
            })}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              const formatted = (Number(value) / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              e.target.value = formatted;
            }}
            placeholder="R$ 0,00"
            className={`w-full pl-10 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount
                ? "border-red-500"
                : "border-blue-300 dark:border-blue-600"
            }`}
          />
          {errors.amount && (
            <ExclamationCircleIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          )}
        </div>
        <AnimatePresence>
          {errors.amount && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.amount.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Campo Tipo */}
      <div className="relative">
        <label className="block text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">
          Tipo
        </label>
        <div className="relative">
          <QuestionMarkCircleIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
          <select
            {...register("type")}
            defaultValue=""
            className={`w-full pl-10 border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.type
                ? "border-red-500"
                : "border-blue-300 dark:border-blue-600"
            }`}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
          {errors.type && (
            <ExclamationCircleIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
          )}
        </div>
        <AnimatePresence>
          {errors.type && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.type.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Salvando..." : "Salvar Lançamento"}
      </button>
    </form>
  );
}
