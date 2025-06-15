"use client"

import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { cn } from "@/lib/utils"
import { MapPin, User, Clock } from "lucide-react"

interface Props {
  ordem: OrdemServicoItf
  selecionada?: boolean
  onClick?: () => void
}

export default function CardPlanejamentoOrdem({ ordem, selecionada, onClick }: Props) {
  return (
    <li
      onClick={onClick}
      className={cn(
        "border border-gray-200 bg-white p-4 shadow-sm hover:shadow transition cursor-pointer",
        selecionada && "ring-2 ring-blue-400"
      )}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <span className="text-xs text-gray-400">{ordem.codigo}</span>
        <span>{ordem.titulo}</span>
      </div>

      <div className="mt-2 flex gap-2 text-xs">
        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 capitalize">
          {ordem.status.replace("_", " ").toLowerCase()}
        </span>
        <span
          className={cn(
            "px-2 py-0.5 rounded text-white",
            ordem.prioridade === "ALTA" && "bg-red-500",
            ordem.prioridade === "MEDIA" && "bg-yellow-500 text-gray-800",
            ordem.prioridade === "BAIXA" && "bg-green-500"
          )}
        >
          {ordem.prioridade}
        </span>
        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
          {ordem.tipoManutencao.charAt(0) + ordem.tipoManutencao.slice(1).toLowerCase()}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Ativo: {ordem.ativo?.nome ?? "Não informado"}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-gray-400" />
          {ordem.ativo?.localizacao_interna ?? "Local não informado"}
        </div>
        <div className="flex items-center gap-2">
          <User className="h-3 w-3 text-gray-400" />
          {ordem.responsavel?.nome ?? "Sem responsável"}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3 w-3 text-gray-400" />
          Vencimento: {new Date(ordem.dataVencimento).toLocaleDateString("pt-BR")}
        </div>
      </div>
    </li>
  )
}
