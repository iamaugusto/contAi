import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Transaction } from "../types/transaction";
import { ConfirmModal } from "./ConfirmModal";
import toast from "react-hot-toast";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

type GroupedTransactions = {
  [key: string]: {
    monthYear: string;
    transactions: Transaction[];
    totalCredit: number;
    totalDebit: number;
    balance: number;
  };
};

function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const PAGE_SIZE = 10;

export function TransactionTable() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [grouped, setGrouped] = useState<GroupedTransactions>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra transações por termo de busca
  const filteredTransactions = allTransactions.filter(
    (tx) =>
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Atualiza agrupamento com base na página atual
  const updateGroupedByPage = useCallback(
    (page: number, data: Transaction[]) => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageData = data.slice(start, end);

      // Move groupTransactions inside to avoid circular dependency
      const groupedData: GroupedTransactions = {};
      pageData.forEach((tx) => {
        const key = formatMonthYear(tx.date);
        if (!groupedData[key]) {
          groupedData[key] = {
            monthYear: key,
            transactions: [],
            totalCredit: 0,
            totalDebit: 0,
            balance: 0,
          };
        }
        groupedData[key].transactions.push(tx);
        if (tx.type === "credit") {
          groupedData[key].totalCredit += Number(tx.amount);
        } else {
          groupedData[key].totalDebit += Number(tx.amount);
        }
        groupedData[key].balance =
          groupedData[key].totalCredit - groupedData[key].totalDebit;
      });

      setGrouped(groupedData);
    },
    []
  );

  // Buscar todas transações
  const fetchTransactions = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get<Transaction[]>(
        "http://localhost:3001/transactions?_sort=date&_order=desc"
      )
      .then((res) => {
        setAllTransactions(res.data);
        setCurrentPage(1);
        updateGroupedByPage(1, res.data);
      })
      .catch(() => {
        setError("Erro ao carregar transações.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [updateGroupedByPage]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Quando a página ou busca mudar, atualiza o agrupamento
  useEffect(() => {
    updateGroupedByPage(currentPage, filteredTransactions);
  }, [currentPage, filteredTransactions, updateGroupedByPage]);

  // Confirma exclusão e atualiza os dados localmente
  const confirmDelete = () => {
    if (!pendingDeleteId) return;

    axios
      .delete(`http://localhost:3001/transactions/${pendingDeleteId}`)
      .then(() => {
        toast.success("Lançamento excluído com sucesso!");
        const newAll = allTransactions.filter((t) => t.id !== pendingDeleteId);
        setAllTransactions(newAll);

        const maxPage = Math.max(1, Math.ceil(newAll.length / PAGE_SIZE));
        if (currentPage > maxPage) setCurrentPage(maxPage);
      })
      .catch(() => {
        toast.error("Erro ao excluir lançamento.");
      })
      .finally(() => {
        setShowModal(false);
        setPendingDeleteId(null);
      });
  };

  // Totais da página atual
  const pageTotals = Object.values(grouped).reduce(
    (acc, g) => ({
      credit: acc.credit + g.totalCredit,
      debit: acc.debit + g.totalDebit,
      balance: acc.balance + g.balance,
    }),
    { credit: 0, debit: 0, balance: 0 }
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / PAGE_SIZE)
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      updateGroupedByPage(page, allTransactions);
    },
    [allTransactions, updateGroupedByPage]
  );

  useEffect(() => {
    updateGroupedByPage(currentPage, allTransactions);
  }, [currentPage, allTransactions, updateGroupedByPage]);

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-6 px-4" aria-live="polite">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          Histórico de Transações
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            onClick={fetchTransactions}
            aria-label="Recarregar transações"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
            disabled={loading}
            type="button"
          >
            <ArrowPathIcon
              className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
            />
            Atualizar
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredTransactions.length} transações encontradas
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Carregando transações...
          </p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p>{error}</p>
          <button
            onClick={fetchTransactions}
            className="mt-2 text-sm text-red-700 underline"
            type="button"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && Object.values(grouped).length === 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            {searchTerm
              ? "Nenhuma transação encontrada para sua busca."
              : "Nenhuma transação cadastrada ainda."}
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        Object.values(grouped).map((group) => (
          <section
            key={group.monthYear}
            className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
            aria-labelledby={`month-year-${group.monthYear.replace(
              /\s+/g,
              "-"
            )}`}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3
                id={`month-year-${group.monthYear.replace(/\s+/g, "-")}`}
                className="text-lg font-semibold text-blue-700 dark:text-blue-400"
              >
                {group.monthYear}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table
                className="w-full text-sm"
                role="grid"
                aria-describedby={`summary-${group.monthYear.replace(
                  /\s+/g,
                  "-"
                )}`}
              >
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300"
                      scope="col"
                    >
                      Data
                    </th>
                    <th
                      className="px-6 py-3 text-left font-medium text-gray-700 dark:text-gray-300"
                      scope="col"
                    >
                      Descrição
                    </th>
                    <th
                      className="px-6 py-3 text-right font-medium text-gray-700 dark:text-gray-300"
                      scope="col"
                    >
                      Valor
                    </th>
                    <th
                      className="px-6 py-3 text-center font-medium text-gray-700 dark:text-gray-300"
                      scope="col"
                    >
                      Tipo
                    </th>
                    <th
                      className="px-6 py-3 text-center font-medium text-gray-700 dark:text-gray-300"
                      scope="col"
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {group.transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                      role="row"
                    >
                      <td
                        className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300"
                        role="gridcell"
                      >
                        {new Date(tx.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td
                        className="px-6 py-4 text-gray-700 dark:text-gray-300"
                        role="gridcell"
                      >
                        {tx.description}
                      </td>
                      <td
                        className={`px-6 py-4 text-right font-mono whitespace-nowrap ${
                          tx.type === "credit"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                        role="gridcell"
                      >
                        {formatCurrency(Number(tx.amount))}
                      </td>
                      <td className="px-6 py-4 text-center" role="gridcell">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            tx.type === "credit"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                          }`}
                        >
                          {tx.type === "credit" ? "Crédito" : "Débito"}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-center whitespace-nowrap"
                        role="gridcell"
                      >
                        <button
                          onClick={() => {
                            if (tx.id !== undefined) {
                              setPendingDeleteId(tx.id);
                              setShowModal(true);
                            }
                          }}
                          aria-label={`Excluir transação: ${tx.description}`}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          type="button"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-800/50 font-medium">
                  <tr aria-label={`Totais do mês ${group.monthYear}`}>
                    <td
                      className="px-6 py-3 text-gray-700 dark:text-gray-300"
                      colSpan={2}
                    >
                      Totais:
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-green-600 dark:text-green-400 whitespace-nowrap">
                      {formatCurrency(group.totalCredit)}
                    </td>
                    <td className="px-6 py-3 text-right font-mono text-red-600 dark:text-red-400 whitespace-nowrap">
                      {formatCurrency(group.totalDebit)}
                    </td>
                    <td className="px-6 py-3 text-center font-mono whitespace-nowrap">
                      <span
                        className={
                          group.balance >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {formatCurrency(group.balance)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        ))}

      {!loading && !error && Object.values(grouped).length > 0 && (
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Créditos
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(pageTotals.credit)}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Débitos
              </p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(pageTotals.debit)}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                pageTotals.balance >= 0
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">Saldo</p>
              <p
                className={`text-xl font-bold ${
                  pageTotals.balance >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatCurrency(pageTotals.balance)}
              </p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ConfirmModal
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowModal(false);
            setPendingDeleteId(null);
          }}
        />
      )}
    </div>
  );
}

// Componente de controles da paginação
function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}) {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav aria-label="Navegação de páginas" className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(1)}
        disabled={disabled || currentPage === 1}
        aria-label="Primeira página"
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        «
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        aria-label="Página anterior"
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        ‹
      </button>

      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={disabled}
          type="button"
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        aria-label="Próxima página"
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        ›
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={disabled || currentPage === totalPages}
        aria-label="Última página"
        className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        »
      </button>
    </nav>
  );
}
