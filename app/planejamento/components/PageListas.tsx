"use client";

import { useState, useEffect, useMemo } from "react";
import BarraFiltros from "./Filtros";
import type { AbaType } from "./Filtros";
import ListaOrdens from "./ListaOrdens";
import DetalhesOrdem from "./DetalhesOrdem";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

export function PageListas() {
  const [ordens, setOrdens] = useState<OrdemServicoItf[]>([]);
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<AbaType>("TODAS");
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null);

  useEffect(() => {
    async function loadOrdens() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`);
      const dados: OrdemServicoItf[] = await res.json();
      setOrdens(dados);
    }
    loadOrdens();
  }, []);

  const ordensFiltradas = useMemo(() => {
    const term = busca.toLowerCase();
    return ordens.filter(o => {
      const okStatus = aba === "TODAS" || o.status === aba;
      const okBusca =
        o.titulo.toLowerCase().includes(term) ||
        o.ativo.nome.toLowerCase().includes(term) ||
        o.ativo.localizacao_interna?.toLowerCase().includes(term);
      return okStatus && okBusca;
    });
  }, [ordens, busca, aba]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-7rem)]">
      {/* coluna de filtro + lista */}
      <div className="md:col-span-1 bg-white rounded-md shadow flex flex-col overflow-hidden">
        <BarraFiltros busca={busca} onBusca={setBusca} aba={aba} onAba={setAba} />
        <div className="flex-1 overflow-y-auto">
          <ListaOrdens ordens={ordensFiltradas} onSelect={setOrdemSelecionada} />
        </div>
      </div>

      {/* painel de detalhes */}
      <div className="md:col-span-2 bg-white rounded-md shadow overflow-auto">
        <DetalhesOrdem ordem={ordemSelecionada} />
      </div>
    </div>
  );
}
