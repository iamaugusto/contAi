import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalculatorIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <CalculatorIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Cont<span className="text-blue-800 dark:text-blue-300">AI</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/lancamentos"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Lançamentos
            </Link>
            <Link
              to="/relatorios"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Relatórios
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Dashboard
            </Link>
          </nav>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Acessar Sistema
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-blue-600">Gestão Contábil</span> Inteligente
              para sua Empresa
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A solução completa para registro, organização e análise de
              lançamentos financeiros com tecnologia AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lancamentos"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition"
              >
                Começar Agora
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition">
                Ver Demonstração
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-blue-600/10 dark:bg-blue-900/20 rounded-2xl p-8 aspect-[4/3] flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full h-full overflow-hidden">
                {/* Mockup do dashboard */}
                <div className="h-3 bg-gray-200 dark:bg-gray-700 flex items-center px-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 h-20 rounded-lg"></div>
                    <div className="bg-green-100 dark:bg-green-900/30 h-20 rounded-lg"></div>
                    <div className="bg-red-100 dark:bg-red-900/30 h-20 rounded-lg"></div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 h-40 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Como a Cont<span className="text-blue-600">AI</span> transforma
              sua contabilidade
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nossa plataforma oferece tudo que você precisa para uma gestão
              financeira eficiente e livre de erros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Lançamentos Automatizados
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cadastro rápido e intuitivo de todos os lançamentos contábeis
                com validação automática.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <div className="bg-green-100 dark:bg-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Organização por Período
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visualização clara dos lançamentos agrupados por mês com totais
                de crédito e débito.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
              <div className="bg-purple-100 dark:bg-purple-900/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Segurança de Dados
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Seus dados financeiros protegidos com criptografia e backups
                automáticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para revolucionar sua gestão contábil?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Experimente a ContAI gratuitamente e descubra como podemos
            simplificar seus processos financeiros.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/lancamentos"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium flex items-center justify-center transition"
            >
              Comece Agora
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <button className="border border-white text-white hover:bg-blue-700 dark:hover:bg-blue-800 px-8 py-3 rounded-lg font-medium transition">
              Fale com um Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <CalculatorIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">
                  Cont<span className="text-blue-400">AI</span>
                </h3>
              </div>
              <p className="text-gray-400">
                A solução inteligente para gestão contábil moderna.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produto</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Lançamentos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Relatórios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Preços
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Integrações
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Segurança
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Mobile
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Carreiras
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} ContAI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
