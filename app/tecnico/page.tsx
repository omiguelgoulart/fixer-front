// TecnicoPage.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ordensServico } from "@/lib/data"

import EstatisticasOrdens from "./components/EstatisticasOrdens"
import ListaOrdens from "./components/ListaOrdens"

export default function TecnicoPage() {
  const [busca, setBusca] = useState("")
  const [ordens] = useState(ordensServico)

  const ordensFiltradas = ordens.filter(
    (ordem) =>
      ordem.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      ordem.ativo.toLowerCase().includes(busca.toLowerCase()) ||
      ordem.localizacao.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <div className="min-h-full bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Minhas Ordens de Serviço</h1>
          </div>
          <p className="text-gray-600">Visualize e gerencie suas ordens de manutenção</p>
        </div>

        <EstatisticasOrdens ordens={ordens} />

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar por título, ativo ou localização..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <ListaOrdens ordens={ordensFiltradas} />

        {ordensFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">Nenhuma ordem encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}
