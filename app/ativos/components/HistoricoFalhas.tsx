"use client";

import { useEffect, useState } from "react";
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
  ativoId: number;
}

export default function HistoricoFalhas({ ativoId }: HistoricoFalhasProps) {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchHistorico() {
      setCarregando(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativoId}/historico`
        );
        const data = await response.json();

        if (data && Array.isArray(data.ordensServico)) {
          setOrdens(data.ordensServico);
        } else {
          setOrdens([]);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        setOrdens([]);
      } finally {
        setCarregando(false);
      }
    }

    fetchHistorico();
  }, [ativoId]);

  if (carregando) {
    return <p className="text-gray-500 mt-6">Carregando histórico...</p>;
  }

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-4">📜 Histórico de Falhas</h3>

      {ordens.length === 0 ? (
        <p className="text-sm text-gray-500">
          Nenhuma ordem registrada para este ativo.
        </p>
      ) : (
        <div className="overflow-x-auto border rounded-lg bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Prioridade</th>
                <th className="px-4 py-2">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {ordens.map((ordem) => (
                <tr key={ordem.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{ordem.titulo}</td>
                  <td className="px-4 py-2">
                    <Badge variant="outline">{ordem.tipoManutencao}</Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="outline">{ordem.status.replace("_", " ").toUpperCase()}</Badge>
                  </td>
                  <td className="px-4 py-2">
                    <Badge variant="outline">{ordem.prioridade}</Badge>
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(ordem.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
