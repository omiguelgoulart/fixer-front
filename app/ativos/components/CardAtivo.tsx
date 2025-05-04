"use client";

import { PlusCircle, Search, FileText, Settings } from "lucide-react";
import Link from "next/link";

// Componente Client para a tela inicial
export default function CardAtivo() {
  return (
    <div className="space-y-6">

    <div className="space-y-6">
      {/* Ações rápidas */}
      <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
        <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
        <div className="space-y-3">
        <Link
          href="/ativos/novo"
          className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-colors"
        >
          <div className="bg-blue-200 p-2 rounded-md mr-3">
            <PlusCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">Cadastrar Novo Ativo</p>
            <p className="text-sm text-gray-500">
            Adicione um novo equipamento ao sistema
            </p>
          </div>
        </Link>

        <Link
          href="/ativos/busca"
          className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-colors"
        >
          <div className="bg-purple-100 p-2 rounded-md mr-3">
            <Search className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="font-medium">Busca Avançada</p>
            <p className="text-sm text-gray-500">
            Encontre ativos com filtros específicos
            </p>
          </div>
        </Link>

        <Link
          href="/relatorios"
          className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-colors"
        >
          <div className="bg-green-100 p-2 rounded-md mr-3">
            <FileText className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium">Gerar Relatórios</p>
            <p className="text-sm text-gray-500">
            Crie relatórios personalizados
            </p>
          </div>
        </Link>

        <Link
          href="/configuracoes"
          className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-colors"
        >
          <div className="bg-gray-100 p-2 rounded-md mr-3">
            <Settings className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">Configurações do Sistema</p>
            <p className="text-sm text-gray-500">
            Personalize as configurações
            </p>
          </div>
        </Link>
        </div>
      </div>

      {/* Dicas e informações */}
      <div className="bg-white border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">
        Dicas de Uso
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-blue-800">
        <li>
          Utilize a árvore de ativos no menu lateral para navegar pela
          hierarquia de equipamentos
        </li>
        <li>Clique em um ativo para visualizar seus detalhes completos</li>
        <li>
          Mantenha os dados de manutenção atualizados para receber alertas
          preventivos
        </li>
        <li>
          Utilize a busca para encontrar rapidamente qualquer ativo no
          sistema
        </li>
        </ul>
      </div>
    </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Última atualização:{" "}
          {new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
