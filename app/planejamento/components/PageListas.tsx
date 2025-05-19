'use client'

import { Suspense, useEffect, useState } from "react";
import { getPlanejamento } from "@/lib/data";
import { ProvedorPlanejamento } from "../../contexts/ContextoPlanejamento";
import BarraFiltros from "./Filtros";
import ListaOrdens from "./ListaOrdens";
import DetalhesOrdem from "./DetalhesOrdem";
import { OrdemServicoItf } from "@/app/utils/types/planejamento";

export  function PageListas() {
  const [dadosIniciais, setDadosIniciais] = useState<OrdemServicoItf [] | null>(null);

  useEffect(() => {
    async function fetchDadosIniciais() {
      const dados = await getPlanejamento();
      setDadosIniciais(dados);
    }
    fetchDadosIniciais();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4">
        <h1 className="sr-only">Página de Planejamento</h1>
          <ProvedorPlanejamento dadosIniciais={dadosIniciais || []}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 bg-white rounded-md shadow">
                <Suspense>
                  <BarraFiltros />
                  <ListaOrdens />
                </Suspense>
              </div>

              <div className="md:col-span-2 bg-white rounded-md shadow">
                <Suspense>
                  <DetalhesOrdem />
                </Suspense>
              </div>
            </div>
          </ProvedorPlanejamento>
      </main>
    </div>
  );
}
