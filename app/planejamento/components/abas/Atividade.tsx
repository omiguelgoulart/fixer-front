"use client"

import { Button } from "@/components/ui/button"
import { Clock, Plus } from "lucide-react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

interface Props {
  ordem: OrdemServicoItf
}

export default function AbaAtividades({ ordem }: Props) {

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

      <ul className="space-y-4 mb-6 list-disc list-inside">
        {ordem.tarefas?.map((tarefa) => (
        <li key={tarefa.id} className="flex items-center gap-3">
        <span
          className={`text-sm ${tarefa.concluida ? "text-gray-500" : ""}`}
        >
          {tarefa.descricao}
        </span>
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
