"use client";

import { useState, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, List, Kanban } from "lucide-react";
import { PageListas } from "./components/PageListas";
import CalendarioManutencoes from "./components/PageCalendario";
import { Button } from "@/components/ui/button";
import ModalNovaOrdem from "./components/ModalNovaOrdem";

export default function PagePlanejamento() {
  const [visualizacao, setVisualizacao] = useState<
    "lista" | "calendario" | "kanban"
  >("lista");

  const [novaOrdemAberta, setNovaOrdemAberta] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-blue-50">
      <main className="flex-1 px-6 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Tabs
            value={visualizacao}
            onValueChange={(v: string) =>
              setVisualizacao(v as "lista" | "calendario" | "kanban")
            }
          >
            <TabsList className="flex w-full md:w-auto overflow-x-auto">
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

          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto"
            onClick={() => setNovaOrdemAberta(true)}
          >
            Adicionar OS
          </Button>

          <ModalNovaOrdem
            open={novaOrdemAberta}
            onClose={() => setNovaOrdemAberta(false)}
            dataSelecionada={null}
          />
        </div>

        <Tabs
          value={visualizacao}
          onValueChange={(v: string) =>
            setVisualizacao(v as "lista" | "calendario" | "kanban")
          }
        >
          <TabsContent value="lista">
            <Suspense fallback={<div className="text-center p-4">Carregando lista...</div>}>
              <PageListas />
            </Suspense>
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
