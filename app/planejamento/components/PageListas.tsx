'use client'

import { useState } from "react"
import BarraFiltros from "./Filtros"
import ListaOrdens from "./ListaOrdens"
import DetalhesOrdem from "./DetalhesOrdem"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

export function PageListas() {
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
      {/* Lista de ordens */}
      <div className="md:col-span-1 bg-white rounded-md shadow flex flex-col overflow-hidden">
        <BarraFiltros />
        <div className="flex-1 overflow-auto">
          <ListaOrdens onSelect={setOrdemSelecionada} />
        </div>
      </div>

      {/* Detalhes da ordem */}
      <div className="md:col-span-2 bg-white rounded-md shadow overflow-auto">
        <DetalhesOrdem ordem={ordemSelecionada} />
      </div>
    </div>
  )
}
