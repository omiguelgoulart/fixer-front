"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Plus } from "lucide-react"

interface Tarefa {
  id: number
  descricao: string
  concluida: boolean
}

export default function AbaAtividades() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, descricao: "Verificar integridade do equipamento", concluida: true },
    { id: 2, descricao: "Substituir eixo", concluida: true },
    { id: 3, descricao: "Aplicar lubrificante", concluida: false },
  ])

  const toggleTarefa = (id: number) => {
    setTarefas(tarefas.map((tarefa) => (tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa)))
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium">Lista de tarefas</h3>
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
          <Clock className="h-5 w-5 text-gray-700" />
          <div>
            <div className="text-sm font-medium">Tempo estimado</div>
            <div className="text-sm">1h e 45 min</div>
          </div>
        </div>
      </div>

      <ul className="space-y-4 mb-6">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className="flex items-center gap-3">
            <Checkbox
              id={`tarefa-${tarefa.id}`}
              checked={tarefa.concluida}
              onCheckedChange={() => toggleTarefa(tarefa.id)}
            />
            <label
              htmlFor={`tarefa-${tarefa.id}`}
              className={`text-sm ${tarefa.concluida ? "line-through text-gray-500" : ""}`}
            >
              {tarefa.descricao}
            </label>
          </li>
        ))}
      </ul>

      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar tarefa
      </Button>
    </div>
  )
}
