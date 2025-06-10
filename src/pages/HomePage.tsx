import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Bem-vindo ao Sistema de Gestão Financeira
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/lancamentos"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Novo Lançamento
            </h2>
            <p className="text-gray-600 mb-4">
              Registre suas receitas e despesas de forma rápida e organizada
            </p>
            <div className="flex items-center text-blue-600">
              Começar <ArrowRightIcon className="w-5 h-5 ml-2" />
            </div>
          </Link>

          <Link
            to="/historico"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Histórico
            </h2>
            <p className="text-gray-600 mb-4">
              Visualize e analise seu histórico financeiro completo
            </p>
            <div className="flex items-center text-blue-600">
              Visualizar <ArrowRightIcon className="w-5 h-5 ml-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
