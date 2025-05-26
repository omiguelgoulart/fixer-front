// app/planejamento/components/Kanban.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

// Tipo da tarefa (ajuste conforme seu backend)
type Tarefa = {
  id: string;
  titulo: string;
  data: string; // ISO string
  status: "planejadas" | "andamento" | "concluidas";
};

// Props do Kanban
interface KanbanProps {
  tarefas: Tarefa[];
}

const colunas = [
  { id: "planejadas", titulo: "Planejadas" },
  { id: "andamento", titulo: "Em andamento" },
  { id: "concluidas", titulo: "Concluídas" },
];

export function Kanban({ tarefas }: KanbanProps) {
  const [periodo, setPeriodo] = useState<"dia" | "semana" | "mes">("semana");

  const estaDentroDoPeriodo = (dataTarefa: string) => {
    const hoje = new Date();
    const data = new Date(dataTarefa);

    if (periodo === "dia") {
      return data.toDateString() === hoje.toDateString();
    }

    if (periodo === "semana") {
      const inicioSemana = new Date(hoje);
      inicioSemana.setDate(hoje.getDate() - hoje.getDay());
      const fimSemana = new Date(inicioSemana);
      fimSemana.setDate(inicioSemana.getDate() + 6);
      return data >= inicioSemana && data <= fimSemana;
    }

    if (periodo === "mes") {
      return (
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );
    }

    return true;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={periodo} onValueChange={(v) => setPeriodo(v as typeof periodo)}>
        <TabsList>
          <TabsTrigger value="dia">Dia</TabsTrigger>
          <TabsTrigger value="semana">Semana</TabsTrigger>
          <TabsTrigger value="mes">Mês</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-4 overflow-x-auto">
        {colunas.map((coluna) => (
          <div
            key={coluna.id}
            className="w-[300px] flex-shrink-0 bg-muted rounded p-4 border shadow-sm"
          >
            <h2 className="text-lg font-semibold text-center mb-2">
              {coluna.titulo}
            </h2>
            {tarefas
              .filter(
                (t) => t.status === coluna.id && estaDentroDoPeriodo(t.data)
              )
              .map((tarefa) => (
                <div
                  key={tarefa.id}
                  className="bg-white rounded p-2 shadow mb-2 text-sm"
                >
                  <p className="font-medium">{tarefa.titulo}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(tarefa.data), "dd/MM/yyyy")}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}