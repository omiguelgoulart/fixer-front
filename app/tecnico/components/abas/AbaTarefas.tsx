// AbaTarefas.tsx
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

export default function AbaTarefas({ ordem, tarefasConcluidas, toggleTarefa }: {
  ordem: OrdemServicoItf,
  tarefasConcluidas: number[],
  toggleTarefa: (id: number) => void
}) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Lista de Tarefas</CardTitle></CardHeader>
      <CardContent>
        {ordem.tarefas?.length ? (
          <div className="space-y-3">
            {ordem.tarefas.map((tarefa) => (
              <div key={tarefa.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Checkbox checked={tarefasConcluidas.includes(tarefa.id)} onCheckedChange={() => toggleTarefa(tarefa.id)} className="mt-1" />
                <div className="flex-1">
                  <p className={tarefasConcluidas.includes(tarefa.id) ? "line-through text-gray-500" : "text-gray-900"}>{tarefa.descricao}</p>
                </div>
                {tarefasConcluidas.includes(tarefa.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 text-center py-8">Nenhuma tarefa cadastrada</p>}
      </CardContent>
    </Card>
  )
}
