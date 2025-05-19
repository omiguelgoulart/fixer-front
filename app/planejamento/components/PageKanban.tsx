"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"

// Tipos para o Kanban
interface OrdemKanban {
  id: string
  titulo: string
  ativo: string
  prioridade: "Alta" | "Média" | "Baixa"
  responsavel: string
}

interface ColunaKanban {
  id: string
  titulo: string
  ordens: OrdemKanban[]
}

// Dados de exemplo
const dadosIniciais: ColunaKanban[] = [
  {
    id: "a_planejar",
    titulo: "A Planejar",
    ordens: [
      { id: "os1", titulo: "Inspeção de rolamentos", ativo: "Esteira 01", prioridade: "Média", responsavel: "Carlos" },
      { id: "os2", titulo: "Troca de óleo", ativo: "Gerador", prioridade: "Alta", responsavel: "Maria" },
    ],
  },
  {
    id: "planejadas",
    titulo: "Planejadas",
    ordens: [
      {
        id: "os3",
        titulo: "Calibração de sensores",
        ativo: "Painel de controle",
        prioridade: "Baixa",
        responsavel: "João",
      },
      {
        id: "os4",
        titulo: "Lubrificação preventiva",
        ativo: "Motor Honda v12",
        prioridade: "Alta",
        responsavel: "Jefferson",
      },
    ],
  },
  {
    id: "em_execucao",
    titulo: "Em Execução",
    ordens: [
      { id: "os5", titulo: "Manutenção elétrica", ativo: "Quadro de força", prioridade: "Alta", responsavel: "Ana" },
    ],
  },
  {
    id: "concluidas",
    titulo: "Concluídas",
    ordens: [
      { id: "os6", titulo: "Troca de filtros", ativo: "Sistema de ar", prioridade: "Média", responsavel: "Pedro" },
      {
        id: "os7",
        titulo: "Limpeza de dutos",
        ativo: "Sistema de ventilação",
        prioridade: "Baixa",
        responsavel: "Lucia",
      },
    ],
  },
]

export default function KanbanOrdens() {
  const [colunas, setColunas] = useState(dadosIniciais)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Find source and destination columns
    const sourceCol = colunas.find((col) => col.id === source.droppableId)
    const destCol = colunas.find((col) => col.id === destination.droppableId)

    if (!sourceCol || !destCol) return

    // Create new arrays
    const newColunas = [...colunas]
    const sourceColIndex = newColunas.findIndex((col) => col.id === source.droppableId)
    const destColIndex = newColunas.findIndex((col) => col.id === destination.droppableId)

    // Same column
    if (source.droppableId === destination.droppableId) {
      const newOrdens = Array.from(sourceCol.ordens)
      const [removed] = newOrdens.splice(source.index, 1)
      newOrdens.splice(destination.index, 0, removed)

      newColunas[sourceColIndex] = {
        ...sourceCol,
        ordens: newOrdens,
      }
    }
    // Different columns
    else {
      const sourceOrdens = Array.from(sourceCol.ordens)
      const [removed] = sourceOrdens.splice(source.index, 1)
      const destOrdens = Array.from(destCol.ordens)
      destOrdens.splice(destination.index, 0, removed)

      newColunas[sourceColIndex] = {
        ...sourceCol,
        ordens: sourceOrdens,
      }

      newColunas[destColIndex] = {
        ...destCol,
        ordens: destOrdens,
      }
    }

    setColunas(newColunas)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {colunas.map((coluna) => (
          <div key={coluna.id} className="min-w-[300px]">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {coluna.titulo} ({coluna.ordens.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <Droppable droppableId={coluna.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px]">
                      {coluna.ordens.map((ordem, index) => (
                        <Draggable key={ordem.id} draggableId={ordem.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 p-3 bg-white border rounded-md shadow-sm"
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium text-sm">{ordem.titulo}</h4>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    ordem.prioridade === "Alta"
                                      ? "bg-red-100 text-red-800"
                                      : ordem.prioridade === "Média"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {ordem.prioridade}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{ordem.ativo}</div>
                              <div className="text-xs mt-2">Resp: {ordem.responsavel}</div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
