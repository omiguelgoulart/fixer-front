// AbaTarefas.tsx
"use client";

import { useState } from "react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Props {
  ordem: OrdemServicoItf;
  tarefasConcluidas: number[];
  toggleTarefa: (id: number) => void;
  onAddTarefa: (descricao: string) => Promise<void>;
}

export default function Tarefas({
  ordem,
  tarefasConcluidas,
  toggleTarefa,
  onAddTarefa,
}: Props) {
  const [nova, setNova] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdicionar = async () => {
    if (!nova.trim()) return;
    setLoading(true);
    try {
      await onAddTarefa(nova.trim());
      setNova("");
      toast.success("Tarefa adicionada!");
    } catch {
      toast.error("Erro ao adicionar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      {/* Formulário fixado */}
      <CardContent className="sticky top-0 bg-white z-10 rounded-b-none border-b">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Descrição da tarefa
          </label>
          <Textarea
            placeholder="Digite a tarefa..."
            value={nova}
            onChange={(e) => setNova(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNova("")}
              disabled={loading || !nova.trim()}
            >
              Limpar
            </Button>
            <Button
              size="sm"
              onClick={handleAdicionar}
              disabled={loading || !nova.trim()}
            >
              {loading ? "Adicionando..." : "Adicionar Tarefa"}
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Lista de tarefas */}
      <CardContent className="max-h-96 overflow-auto space-y-2">
        {ordem.tarefas.length > 0 ? (
          ordem.tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="flex items-center gap-3 p-2 bg-gray-50 rounded"
            >
              <Checkbox
                checked={tarefasConcluidas.includes(tarefa.id)}
                onCheckedChange={() => toggleTarefa(tarefa.id)}
              />
              <p
                className={`flex-1 ${
                  tarefasConcluidas.includes(tarefa.id)
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {tarefa.descricao}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Nenhuma tarefa cadastrada.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
