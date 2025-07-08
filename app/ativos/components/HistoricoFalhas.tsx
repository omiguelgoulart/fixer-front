"use client";

import { Badge } from "@/components/ui/badge";

interface OrdemServico {
  id: number;
  titulo: string;
  tipoManutencao: string;
  status: string;
  prioridade: string;
  createdAt: string;
}

interface HistoricoFalhasProps {
  ordens: OrdemServico[];
}

// 🔧 Cores com fundo sólido + texto branco (igual à imagem)
function corTipo(tipo: string) {
  switch (tipo.toUpperCase()) {
    case "CORRETIVA":
      return "bg-red-500 text-white";
    case "PREVENTIVA":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function corStatus(status: string) {
  switch (status.toUpperCase()) {
    case "CONCLUIDA":
      return "bg-green-500 text-white";
    case "EM_ABERTO":
      return "bg-yellow-500 text-white";
    case "CANCELADA":
      return "bg-gray-500 text-white";
    default:
      return "bg-blue-500 text-white";
  }
}

function corPrioridade(prioridade: string) {
  switch (prioridade.toUpperCase()) {
    case "ALTA":
      return "bg-red-500 text-white";
    case "MEDIA":
      return "bg-yellow-500 text-white";
    case "BAIXA":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export default function HistoricoFalhas({ ordens }: HistoricoFalhasProps) {
  const renderTabela = (lista: OrdemServico[]) => (
    <div className="overflow-x-auto border rounded-lg bg-white mb-6">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2 whitespace-nowrap">Título</th>
            <th className="px-4 py-2 whitespace-nowrap">Tipo</th>
            <th className="px-4 py-2 whitespace-nowrap">Status</th>
            <th className="px-4 py-2 whitespace-nowrap">Prioridade</th>
            <th className="px-4 py-2 whitespace-nowrap">Criado em</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((ordem) => (
            <tr key={ordem.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{ordem.titulo}</td>
              <td className="px-4 py-2">
                <Badge className={`${corTipo(ordem.tipoManutencao)} capitalize`}>
                  {ordem.tipoManutencao.toLowerCase()}
                </Badge>
              </td>
              <td className="px-4 py-2">
                <Badge className={`${corStatus(ordem.status)} capitalize`}>
                  {ordem.status.replace("_", " ").toLowerCase()}
                </Badge>
              </td>
              <td className="px-4 py-2">
                <Badge className={`${corPrioridade(ordem.prioridade)} capitalize`}>
                  {ordem.prioridade.toLowerCase()}
                </Badge>
              </td>
              <td className="px-4 py-2 text-gray-500">
                {new Date(ordem.createdAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-4">📜 Histórico de Manutenções</h3>

      {ordens.length === 0 ? (
        <p className="text-sm text-gray-500">
          Nenhuma ordem registrada para este ativo.
        </p>
      ) : (
        renderTabela(ordens)
      )}
    </div>
  );
}
