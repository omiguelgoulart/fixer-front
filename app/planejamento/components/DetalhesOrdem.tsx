"use client"

// import { useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import AbaGeral from "./abas/Geral"
import AbaAtividades from "./abas/Atividade"
import AbaApontamentos from "./abas/Apontamentos"
import AbaItens from "./abas/Itens"
// import AbaProcedimentos from "./abas/Procedimentos"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

interface Props {
  ordem: OrdemServicoItf | null
}

export default function DetalhesOrdem({ ordem }: Props) {
  if (!ordem) {
    return <div className="p-8 text-center text-gray-500">Selecione uma ordem para visualizar os detalhes</div>
  }


  return (
    <div>
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <span className="text-gray-500 text-sm">#{ordem.id}</span>
          <h2 className="font-medium">{ordem.titulo}</h2>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Printer className="h-5 w-5" />
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
          <AbaGeral ordem={ordem} />
        </TabsContent>

        <TabsContent value="atividades">
          <AbaAtividades ordem={ordem} />
        </TabsContent>

        <TabsContent value="apontamentos">
          <AbaApontamentos ordem={ordem} />
        </TabsContent>

        <TabsContent value="itens">
          <AbaItens ordem={ordem} />
        </TabsContent>

        {/* <TabsContent value="procedimentos">
          <AbaProcedimentos ordem={ordem} />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
