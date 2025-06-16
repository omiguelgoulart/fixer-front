"use client";

import { useState, useEffect } from "react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import FormTarefas from "@/app/planejamento/components/FormTarefas";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

interface Props {
  ordem: OrdemServicoItf;
  tarefasConcluidas: number[];
  toggleTarefa: (id: number) => void;
  onUpdate: (novaOrdem: OrdemServicoItf) => void; // callback para atualizar pai
}

export default function AbaTarefas({ ordem, tarefasConcluidas, toggleTarefa, onUpdate }: Props) {
  const [tarefas, setTarefas] = useState(ordem.tarefas || []);

  // Se a ordem mudar, atualiza as tarefas
  useEffect(() => {
    setTarefas(ordem.tarefas || []);
  }, [ordem.id, ordem.tarefas]);

  // Quando uma nova tarefa é criada, recarrega
  async function handleSuccess() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${ordem.id}/os`);
    if (res.ok) {
      const data: OrdemServicoItf = await res.json();
      setTarefas(data.tarefas || []);
      onUpdate(data);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <FormTarefas ordemServicoId={ordem.id} onSuccess={handleSuccess} />

      {tarefas.length > 0 ? (
        <div className="space-y-3">
          {tarefas.map((t) => (
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
                <p className={tarefasConcluidas.includes(t.id) ? "line-through text-gray-500" : "text-gray-900"}>
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
        <p className="text-gray-500 text-center py-8">Nenhuma tarefa cadastrada.</p>
      )}
    </div>
  );
}
