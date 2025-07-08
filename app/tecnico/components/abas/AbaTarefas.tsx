"use client";

import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import FormTarefas from "@/app/planejamento/components/FormTarefas";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { useTecnico } from "../../stores/useTecnico";

interface Props {
  ordem: OrdemServicoItf;
  tarefasConcluidas: number[];
  toggleTarefa: (id: number) => void;
  onUpdate: (novaOrdem: OrdemServicoItf) => void;
}

export default function AbaTarefas({
  ordem,
  tarefasConcluidas,
  toggleTarefa,
  onUpdate,
}: Props) {
  const { buscarOrdemPorId } = useTecnico();

  async function handleSuccess() {
    const atualizada = await buscarOrdemPorId(ordem.id);
    if (atualizada) onUpdate(atualizada);
  }

  return (
    <div className="p-4 space-y-4">
      <FormTarefas ordemServicoId={ordem.id} onSuccess={handleSuccess} />

      {ordem.tarefas && ordem.tarefas.length > 0 ? (
        <div className="space-y-3">
          {ordem.tarefas.map((t) => (
            <div
              key={t.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <Checkbox
                checked={tarefasConcluidas.includes(t.id)}
                onCheckedChange={() => toggleTarefa(t.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <p
                  className={
                    tarefasConcluidas.includes(t.id)
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }
                >
                  {t.descricao}
                </p>
              </div>
              {tarefasConcluidas.includes(t.id) && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Nenhuma tarefa cadastrada.
        </p>
      )}
    </div>
  );
}
