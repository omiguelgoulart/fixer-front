"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText, Package, Settings } from "lucide-react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import AbaTarefas from "@/app/tecnico/components/abas/AbaTarefas";
import AbaItens from "@/app/tecnico/components/abas/AbaItens";
import { Procedimentos } from "@/app/tecnico/components/abas/AbaProcedimento";
import AbaApontamentos from "@/app/tecnico/components/abas/AbaApontamentos";

interface Props {
  ordem: OrdemServicoItf;
  tarefasConcluidas: number[];
  toggleTarefa: (id: number) => void;
  novoApontamento: string;
  setNovoApontamento: (v: string) => void;
  onUpdateOrdem: (novaOrdem: OrdemServicoItf) => void;  // precisa existir
}

export default function OrdemTabs({
  ordem,
  tarefasConcluidas,
  toggleTarefa,
  onUpdateOrdem,
}: Props) {
  const [ordemDados, setOrdemDados] = useState<OrdemServicoItf>(ordem);


  return (
    <Tabs defaultValue="tarefas" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="tarefas" className="text-xs">
          <CheckCircle2 className="h-4 w-4 mr-1" /> Tarefas
        </TabsTrigger>
        <TabsTrigger value="itens" className="text-xs">
          <Package className="h-4 w-4 mr-1" /> Itens
        </TabsTrigger>
        <TabsTrigger value="procedimentos" className="text-xs">
          <FileText className="h-4 w-4 mr-1" /> Procedimentos
        </TabsTrigger>
        <TabsTrigger value="apontamentos" className="text-xs">
          <Settings className="h-4 w-4 mr-1" /> Apontamentos
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tarefas">

        <AbaTarefas
          ordem={ordemDados}
          tarefasConcluidas={tarefasConcluidas}
          toggleTarefa={toggleTarefa}
          onUpdate={setOrdemDados}
        />

      </TabsContent>

      <TabsContent value="itens">
        <AbaItens ordem={ordem} onUpdate={onUpdateOrdem} />
      </TabsContent>

      <TabsContent value="procedimentos">
        <Procedimentos />
      </TabsContent>

      <TabsContent value="apontamentos">
        <AbaApontamentos
          ordem={ordem}
          onUpdate={onUpdateOrdem}
        />
      </TabsContent>
    </Tabs>
  );
}
