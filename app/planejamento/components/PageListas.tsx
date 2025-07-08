"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BarraFiltros from "./Filtros";
import type { AbaType, CriticidadeType, TipoManutencaoType } from "./Filtros";
import ListaOrdens from "./ListaOrdens";
import DetalhesOrdem from "./DetalhesOrdem";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { usePlanejamento } from "../stores/usePlanejamento";

export function PageListas() {
  const searchParams = useSearchParams();
  const ordemIdFromUrl = searchParams.get("ordem");

  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<AbaType>("TODAS");
  const [criticidade, setCriticidade] = useState<CriticidadeType>("TODAS");
  const [tipoManutencao, setTipoManutencao] = useState<TipoManutencaoType>("TODAS");
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null);

  const { ordens, fetchOrdens } = usePlanejamento();

  useEffect(() => {
    fetchOrdens();
  }, [fetchOrdens]);

  // Seleciona a ordem automaticamente se vier pela URL
  useEffect(() => {
    if (ordemIdFromUrl && ordens.length > 0) {
      const ordem = ordens.find((o) => o.id.toString() === ordemIdFromUrl);
      if (ordem) setOrdemSelecionada(ordem);
    }
  }, [ordemIdFromUrl, ordens]);

  const ordensFiltradas = useMemo(() => {
    const term = busca.toLowerCase();
    return ordens.filter((o) => {
      const okStatus = aba === "TODAS" || o.status === aba;
      const okCrit = criticidade === "TODAS" || o.prioridade === criticidade;
      const okTipo = tipoManutencao === "TODAS" || o.tipoManutencao === tipoManutencao;
      const okBusca =
        o.titulo.toLowerCase().includes(term) ||
        o.ativo?.nome?.toLowerCase().includes(term) ||
        o.ativo?.localizacao_interna?.toLowerCase().includes(term);
      return okStatus && okCrit && okTipo && okBusca;
    });
  }, [ordens, busca, aba, criticidade, tipoManutencao]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-7rem)]">
      <div className="md:col-span-1 bg-white rounded-md shadow flex flex-col overflow-hidden">
        <BarraFiltros
          ordens={ordens}
          busca={busca}
          onBusca={setBusca}
          aba={aba}
          onAba={setAba}
          criticidade={criticidade}
          onCriticidade={setCriticidade}
          tipoManutencao={tipoManutencao}
          onTipoManutencao={setTipoManutencao}
        />

        <div className="flex-1 overflow-y-auto">
          <ListaOrdens
            ordens={ordensFiltradas}
            ordemSelecionada={ordemSelecionada}
            onSelect={setOrdemSelecionada}
          />

        </div>
      </div>

      <div className="md:col-span-2 bg-white rounded-md shadow overflow-auto">
        <DetalhesOrdem ordem={ordemSelecionada} />
      </div>
    </div>
  );
}
