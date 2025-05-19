"use client"


import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Printer, Plus } from "lucide-react"
import { useContextoPlanejamento } from "@/app/contexts/ContextoPlanejamento"
import AbaGeral from "./abas/Geral"
import AbaAtividades from "./abas/Atividade"
import AbaApontamentos from "./abas/Apontamentos"
import AbaItens from "./abas/Itens"
import AbaProcedimentos from "./abas/Procedimentos"

export default function DetalhesOrdem() {
  const { ordemSelecionada } = useContextoPlanejamento()

  if (!ordemSelecionada) {
    return <div className="p-8 text-center text-gray-500">Selecione uma ordem para visualizar os detalhes</div>
  }

  return (
    <div>
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <span className="text-gray-500 text-sm">#{ordemSelecionada.id}</span>
          <h2 className="font-medium">{ordemSelecionada.titulo}</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Printer className="h-5 w-5" />
          </Button>

          <Button variant="default" className="bg-blue-500 text-white hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-1" />
            Adicionar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="geral">
        <TabsList className="px-4 pt-2">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="atividades">Atividades</TabsTrigger>
          <TabsTrigger value="apontamentos">Apontamentos</TabsTrigger>
          <TabsTrigger value="itens">Itens</TabsTrigger>
          <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <AbaGeral ordem={ordemSelecionada} />
        </TabsContent>

        <TabsContent value="atividades">
          <AbaAtividades />
        </TabsContent>

        <TabsContent value="apontamentos">
          <AbaApontamentos />
        </TabsContent>

        <TabsContent value="itens">
          <AbaItens />
        </TabsContent>

        <TabsContent value="procedimentos">
          <AbaProcedimentos />
        </TabsContent>
      </Tabs>
    </div>
  )
}
