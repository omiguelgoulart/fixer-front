"use client"

import { OrdemServicoItf } from "@/app/utils/types/planejamento"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface AbaGeralProps {
  ordem: OrdemServicoItf
}

export default function AbaGeral({ ordem }: AbaGeralProps) {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Status</h3>
          <div className="bg-blue-100 text-blue-800 inline-block px-2 py-1 rounded text-sm">Em aberto</div>

          <h3 className="font-medium mt-4 mb-2">Prioridade</h3>
          <div
            className={`text-white inline-block px-2 py-1 rounded text-sm ${
              ordem.prioridade === "Alta"
                ? "bg-red-500"
                : ordem.prioridade === "Média"
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
          >
            {ordem.prioridade}
          </div>

          <h3 className="font-medium mt-4 mb-2">Responsável</h3>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm mr-1">#{ordem.responsavelId}</span>
            <span>{ordem.responsavel}</span>
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Ativo</h3>
          <p>{ordem.ativo}</p>

          <h3 className="font-medium mt-4 mb-2">Executantes</h3>
          <div className="flex items-center">
            <span>Atribuir</span>
            <Button variant="ghost" size="icon" className="ml-1">
              <User className="h-4 w-4" />
            </Button>
          </div>

          <h3 className="font-medium mt-4 mb-2">Localização do ativo</h3>
          <div className="flex items-center">
            <span className="text-gray-500 text-sm mr-1">#{ordem.localizacaoId}</span>
            <span>{ordem.localizacao}</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Data de Início Planejada</h3>
          <p>{ordem.dataInicioPlanejada}</p>

          <h3 className="font-medium mt-4 mb-2">Data de Vencimento</h3>
          <p>{ordem.dataVencimento}</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Tipo de manutenção</h3>
          <p>#{ordem.tipoManutencao}</p>
        </div>
      </div>
    </div>
  )
}
