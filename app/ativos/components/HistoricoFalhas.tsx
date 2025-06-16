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
        console.log("Carregando histórico para o ativo:", ativoId);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/ativos/${ativoId}/historico`
        );
        const data = await response.json();
        setOrdens(data.ordensServico || []);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
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
      <h3 className="font-semibold text-lg mb-3">📜 Histórico de Falhas</h3>
      {ordens.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma ordem registrada para este ativo.</p>
      ) : (
        <ul className="space-y-3">
          {ordens.map((ordem) => (
            <li
              key={ordem.id}
              className="border rounded-lg p-3 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <p className="font-medium">{ordem.titulo}</p>
              <div className="flex gap-2 text-xs mt-1 flex-wrap">
                <Badge variant="outline">Manutenção: {ordem.tipoManutencao}</Badge>
                <Badge variant="outline">Status: {ordem.status}</Badge>
                <Badge variant="outline">Prioridade: {ordem.prioridade}</Badge>
                <span className="text-gray-400 ml-auto">
                  Criado em: {new Date(ordem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
