'use client'

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, List, Kanban, Plus } from "lucide-react"
import { PageListas } from "./components/PageListas"
import CalendarioManutencoes from "./components/PageCalendario"
import { Button } from "@/components/ui/button"
import { ModalNovaOrdem } from "./components/ModalNovaOrdem"

export default function PagePlanejamento() {
  const [visualizacao, setVisualizacao] = useState<"lista" | "calendario" | "kanban">("lista")
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex justify-center">
            <Tabs value={visualizacao} onValueChange={(v: string) => setVisualizacao(v as "lista" | "calendario" | "kanban")}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="lista">
                  <List className="h-4 w-4 mr-2" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="calendario">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendário
                </TabsTrigger>
                <TabsTrigger value="kanban">
                  <Kanban className="h-4 w-4 mr-2" />
                  Kanban
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Aqui o botão azul passa a ser o DialogTrigger do modal */}
          <ModalNovaOrdem >
            <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar OS
            </Button>
          </ModalNovaOrdem>
        </div>

        <Tabs value={visualizacao} onValueChange={(v: string) => setVisualizacao(v as "lista" | "calendario" | "kanban")}>
          <TabsContent value="lista">
            <PageListas />
          </TabsContent>
          <TabsContent value="calendario">
            <CalendarioManutencoes />
          </TabsContent>
          <TabsContent value="kanban">
            <div className="p-4 text-gray-500 text-sm">Kanban ainda não implementado.</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}