// BarraFiltros.tsx
"use client";

import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Defina o tipo AbaType localmente
export type AbaType = "TODAS" | "EM_ABERTO" | "CONCLUIDA";

type Props = {
  busca: string;
  onBusca: (s: string) => void;
  aba: AbaType;
  onAba: (a: AbaType) => void;
};

export default function BarraFiltros({ busca, onBusca, aba, onAba }: Props) {
  return (
    <div className="p-4 border-b">
      <div className="mb-4 relative">
        <input
          value={busca}
          onChange={e => onBusca(e.target.value)}
          placeholder="Buscar..."
          className="w-full pl-3 pr-10 py-2 border rounded-md"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
      </div>
      <Tabs value={aba} onValueChange={(v) => onAba(v as AbaType)}>
        <TabsList className="w-full">
          <TabsTrigger value="TODAS" className="flex-1">Todas</TabsTrigger>
          <TabsTrigger value="EM_ABERTO" className="flex-1">Em aberto</TabsTrigger>
          <TabsTrigger value="CONCLUIDA" className="flex-1">Concluídas</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
