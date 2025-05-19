"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"

export default function AbaApontamentos() {
  const [observacoes, setObservacoes] = useState("")

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Executantes</h3>
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-1">Jonas</div>
          </div>

          <h3 className="font-medium mb-4 mt-6">Requisito de horas</h3>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>4h : 30 min</span>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Hora de início</h3>
            <div>14:30</div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Hora de fim</h3>
            <div>-</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Observações</h3>
          <Textarea
            placeholder="Digite suas observações aqui..."
            className="min-h-[200px]"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />

          <div className="mt-4 flex justify-end">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Anotar</Button>
          </div>
        </div>
      </div>
    </div>
  )
}