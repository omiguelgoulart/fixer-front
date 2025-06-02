"use client"

import type React from "react"

import { useState } from "react"
import { Search, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContextoPlanejamento } from "@/app/contexts/ContextoPlanejamento"


export default function BarraFiltros() {
  const [termoBusca, setTermoBusca] = useState("")
  const { filtrarOrdens } = useContextoPlanejamento()

  const handleBusca = (e: React.FormEvent) => {
    e.preventDefault()
    filtrarOrdens({ busca: termoBusca })
  }

  return (
    <div className="p-4 border-b">
      <form onSubmit={handleBusca} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ordem de serviço"
            className="w-full pl-3 pr-10 py-2 border rounded-md"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2" aria-label="Buscar">
            <Search className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </form>

      <div className="flex space-x-2 mb-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Filtros</span>
        </Button>

        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Responsável</span>
        </Button>

        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Datas</span>
        </Button>
      </div>

      <Tabs defaultValue="em-aberto">
        <TabsList className="w-full">
          <TabsTrigger value="em-aberto" className="flex-1">
            Em aberto
          </TabsTrigger>
          <TabsTrigger value="concluidas" className="flex-1">
            Concluídas
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export type ContextoPlanejamentoProps = {
  // outras propriedades
  filtrarOrdens: (params: { busca: string }) => void
}
