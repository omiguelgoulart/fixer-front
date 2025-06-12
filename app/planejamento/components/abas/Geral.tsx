"use client";

import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

interface Props {
  ordem: OrdemServicoItf;
}

export default function AbaGeral({ ordem }: Props) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
         <h3 className="font-medium mb-2">Status</h3>
<div className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium capitalize">
  {ordem.status
    ? ordem.status.replace("_", " ").toLowerCase()
    : "em aberto"}
</div>


          <h3 className="font-medium mt-4 mb-2">Prioridade</h3>
          <div
            className={`text-white inline-block px-2 py-1 rounded text-sm ${
              ordem.prioridade === "ALTA"
                ? "bg-red-500"
                : ordem.prioridade === "MEDIA"
                ? "bg-yellow-500"
                : ordem.prioridade === "BAIXA"
                ? "bg-green-500"
                : ""
            }`}
          >
            {ordem.prioridade}
          </div>

          <h3 className="font-medium mt-4 mb-2">Responsável</h3>
          <div className="flex items-center">
            <p className="text-sm">
              #{ordem.responsavelId} — {ordem.responsavel?.nome ?? "Sem nome"}
            </p>
            <span>{ordem.responsavelId}</span>
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Ativo</h3>
          <p>{ordem.ativoId}</p>

          <h3 className="font-medium mt-4 mb-2">Executantes</h3>
          <div className="flex items-center">
            <span>Atribuir</span>
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="font-medium mt-4 mb-2">Localização do ativo</h3>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm mr-1">
              {ordem.ativo.id_area ? `#${ordem.ativo.id_area}` : ""}
            </span>
            <span>{ordem.ativo.id_area}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Data de Início Planejada</h3>
          <p>{ordem.dataInicioPlanejada
            ? new Date(ordem.dataInicioPlanejada).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
            </p>

          <h3 className="font-medium mt-4 mb-2">Data de Vencimento</h3>
          <p>
            {ordem.dataVencimento
              ? new Date(ordem.dataVencimento).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Tipo de manutenção</h3>
          <p>{ordem.tipoManutencao ? `#${ordem.tipoManutencao}` : ""}</p>
        </div>
      </div>
    </div>
  );
}
