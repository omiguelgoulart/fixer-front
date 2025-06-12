// app/planejamento/page.tsx
'use client'

import { useState, useEffect, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar, List, Kanban } from "lucide-react"
import { PageListas } from "./components/PageListas"
import CalendarioManutencoes from "./components/PageCalendario"
import { Button } from "@/components/ui/button"
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf" // Use a sua interface

export default function PagePlanejamento() {
  const [visualizacao, setVisualizacao] = useState<"lista" | "calendario" | "kanban">("lista")
  
  // 1. Adicionado estado para armazenar as ordens de serviço
  const [ordensDeServico, setOrdensDeServico] = useState<OrdemServicoItf[]>([])

  // 2. Adicionado useEffect para buscar os dados da API quando o componente carregar
  useEffect(() => {
    const fetchOrdens = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        // Certifique-se de que o endpoint no backend é '/ordemServico'
        const response = await fetch(`${apiBaseUrl}/ordemServico`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados');
        }
        const data: OrdemServicoItf[] = await response.json();
        setOrdensDeServico(data);
      } catch (error) {
        console.error("Falha ao buscar ordens de serviço:", error);
        // Aqui você pode adicionar um toast de erro para o usuário
      }
    };
    fetchOrdens();
  }, []); // O array vazio [] faz com que a busca ocorra apenas uma vez

  // 3. Adicionado useMemo para agrupar as ordens por data para o calendário
  const ordensAgrupadasPorData = useMemo(() => {
    const grouped = new Map<string, OrdemServicoItf[]>();
    
    ordensDeServico.forEach(ordem => {
      // Usamos a 'dataInicioPlanejada' para agrupar
      if (ordem.dataInicioPlanejada) {
        // Formata a data para 'yyyy-MM-dd' para criar uma chave única por dia
        const dataChave = ordem.dataInicioPlanejada.substring(0, 10);
        
        if (!grouped.has(dataChave)) {
          grouped.set(dataChave, []);
        }
        grouped.get(dataChave)?.push(ordem);
      }
    });
    
    return grouped;
  }, [ordensDeServico]); // Recalcula apenas se a lista de ordens mudar

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
          <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
            <span className="text-sm">Adicionar OS</span>
          </Button>
        </div>

        {/* Note que o 'value' do Tabs aqui não precisa mais de um onValueChange,
            pois o primeiro conjunto de abas já controla o estado 'visualizacao' */}
        <Tabs value={visualizacao}>
          <TabsContent value="lista">
            {/* 4. Passando os dados para o componente de Lista */}
            <PageListas ordensDeServico={ordensDeServico} />
          </TabsContent>
          <TabsContent value="calendario">
            {/* 5. Passando os dados AGRUPADOS para o componente de Calendário */}
            <CalendarioManutencoes ordensAgrupadas={ordensAgrupadasPorData} />
          </TabsContent>
          <TabsContent value="kanban">
            <div className="p-4 text-gray-500 text-sm">Kanban ainda não implementado.</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}