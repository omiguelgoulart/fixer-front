"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"

interface Item {
  id: number
  nome: string
  codigo: string
  quantidade: string
  selecionado: boolean
}

export default function AbaItens() {
  const [itens, setItens] = useState<Item[]>([
    { id: 1, nome: "Graxa automotiva", codigo: "GX", quantidade: "350 g", selecionado: true },
    { id: 2, nome: "Bucha de suspensão", codigo: "BX", quantidade: "1 un", selecionado: true },
    { id: 3, nome: "Filtro de óleo", codigo: "FO", quantidade: "1 un", selecionado: true },
  ])

  const toggleItem = (id: number) => {
    setItens(itens.map((item) => (item.id === id ? { ...item, selecionado: !item.selecionado } : item)))
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-6">Lista de insumos utilizados</h3>

      <ul className="space-y-4 mb-6">
        {itens.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <Checkbox id={`item-${item.id}`} checked={item.selecionado} onCheckedChange={() => toggleItem(item.id)} />
            <div className="flex-1">
              <label htmlFor={`item-${item.id}`} className="text-sm font-medium">
                {item.nome}
              </label>
              <div className="text-xs text-gray-500">
                {item.codigo} - {item.quantidade}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar item
      </Button>
    </div>
  )
}
