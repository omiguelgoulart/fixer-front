// components/ordem/OrdemTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, FileText, Package, Settings } from "lucide-react";
import AbaTarefas from "./abas/AbaTarefas";
import AbaItens from "./abas/AbaItens";
import AbaProcedimentos from "./abas/AbaProcedimentos";
import AbaApontamentos from "./abas/AbaApontamentos";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

interface Props {
  ordem: OrdemServicoItf;
  tarefasConcluidas: number[];
  toggleTarefa: (id: number) => void;
  novoApontamento: string;
  setNovoApontamento: (v: string) => void;
}

export default function OrdemTabs({ ordem, tarefasConcluidas, toggleTarefa, novoApontamento, setNovoApontamento }: Props) {
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
        <AbaTarefas ordem={ordem} tarefasConcluidas={tarefasConcluidas} toggleTarefa={toggleTarefa} />
      </TabsContent>
      <TabsContent value="itens">
        <AbaItens ordem={ordem} />
      </TabsContent>
      <TabsContent value="procedimentos">
        <AbaProcedimentos />
      </TabsContent>
      <TabsContent value="apontamentos">
        <AbaApontamentos novoApontamento={novoApontamento} setNovoApontamento={setNovoApontamento} />
      </TabsContent>
    </Tabs>
  );
}