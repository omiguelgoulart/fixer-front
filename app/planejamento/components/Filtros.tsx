"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

export type AbaType = "TODAS" | "EM_ABERTO" | "CONCLUIDA";
export type CriticidadeType = "TODAS" | "ALTA" | "MEDIA" | "BAIXA";
export type TipoManutencaoType = "TODAS" | "PREVENTIVA" | "CORRETIVA" | "PREDITIVA";

type Props = {
  ordens: OrdemServicoItf[];
  busca: string;
  onBusca: (s: string) => void;
  aba: AbaType;
  onAba: (a: AbaType) => void;
  criticidade: CriticidadeType;
  onCriticidade: (c: CriticidadeType) => void;
  tipoManutencao: TipoManutencaoType;
  onTipoManutencao: (t: TipoManutencaoType) => void;
};

export default function BarraFiltros({
  busca,
  onBusca,
  aba,
  onAba,
  criticidade,
  onCriticidade,
  tipoManutencao,
  onTipoManutencao,
}: Props) {
  return (
    <div className="p-4 border-b space-y-4">
      <div className="relative">
        <input
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
          placeholder="Buscar..."
          className="w-full pl-3 pr-10 py-2 border rounded-md"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Select value={aba} onValueChange={(v) => onAba(v as AbaType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Status</SelectItem>
            <SelectItem value="EM_ABERTO">Em aberto</SelectItem>
            <SelectItem value="CONCLUIDA">Concluídas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={criticidade} onValueChange={(v) => onCriticidade(v as CriticidadeType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Criticidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Criticidade</SelectItem>
            <SelectItem value="ALTA">Alta</SelectItem>
            <SelectItem value="MEDIA">Média</SelectItem>
            <SelectItem value="BAIXA">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={tipoManutencao} onValueChange={(v) => onTipoManutencao(v as TipoManutencaoType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tipo de Manutenção" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODAS">Tipo</SelectItem>
            <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
            <SelectItem value="CORRETIVA">Corretiva</SelectItem>
            <SelectItem value="PREDITIVA">Preditiva</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
