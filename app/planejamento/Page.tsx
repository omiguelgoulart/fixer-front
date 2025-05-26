"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, List, Kanban } from "lucide-react";
import { PageListas } from "./components/PageListas";
import CalendarioManutencoes from "./components/PageCalendario";
import { Button } from "@/components/ui/button";

export default function PagePlanejamento() {
  const [visualizacao, setVisualizacao] = useState<"lista" | "calendario" | "kanban">("lista");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4 space-y-4">
        {/* Alinhamento entre botão e abas */}
        <div className="flex justify-center items-center flex-wrap gap-2">

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

          <Button variant="outline">
            <span className="text-sm">Adicionar OS</span>
          </Button>
        </div>

        {/* Conteúdo das abas */}
        <Tabs value={visualizacao} onValueChange={(v: string) => setVisualizacao(v as "lista" | "calendario" | "kanban")}>
          <TabsContent value="lista">
            <PageListas />
          </TabsContent>
          <TabsContent value="calendario">
            <CalendarioManutencoes />
          </TabsContent>
          <TabsContent value="kanban">
            <Kanban />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
