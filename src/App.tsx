import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  HomeIcon,
} from "@heroicons/react/24/solid";

import { HomePage } from "./components/pages/HomePage";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionTable } from "./components/TransactionTable";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "table">("form");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-4 py-10 flex flex-col items-center">
      {/* Botão dark mode fixo no topo direito */}
      <button
        onClick={() => setIsDark(!isDark)}
        title={isDark ? "Modo claro" : "Modo escuro"}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 shadow-md transition z-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SunIcon className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MoonIcon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Botão para voltar à Home */}
      <Link
        to="/"
        className="fixed top-4 left-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-md transition z-50"
        title="Voltar para a página inicial"
      >
        <HomeIcon className="w-5 h-5" />
      </Link>

      {/* Abas de navegação */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("form")}
          className={`flex items-center gap-2 px-6 py-2 rounded-t-lg font-medium transition-all duration-200 ${
            activeTab === "form"
              ? "bg-white dark:bg-gray-800 dark:text-blue-400 border-t border-l border-r shadow text-blue-600"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          <ClipboardDocumentListIcon className="w-5 h-5" />
          Cadastro
        </button>

        <button
          onClick={() => setActiveTab("table")}
          className={`flex items-center gap-2 px-6 py-2 rounded-t-lg font-medium transition-all duration-200 ${
            activeTab === "table"
              ? "bg-white dark:bg-gray-800 dark:text-blue-400 border-t border-l border-r shadow text-blue-600"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          <Squares2X2Icon className="w-5 h-5" />
          Lançamentos
        </button>
      </div>

      {/* Conteúdo com transição animada */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow border border-gray-200 dark:border-gray-700">
        <AnimatePresence mode="wait">
          {activeTab === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TransactionForm />
            </motion.div>
          )}
          {activeTab === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TransactionTable />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/lancamentos"
          element={
            <MainLayout>
              <TransactionForm />
            </MainLayout>
          }
        />
        <Route
          path="/historico"
          element={
            <MainLayout>
              <TransactionTable />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
