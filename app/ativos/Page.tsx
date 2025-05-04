"use client";

import { useState, Suspense } from "react";
import DetalhesAtivo from "./components/DetalheAtivo";
import Sidebar from "./components/Sidebar";
import CardAtivo from "./components/CardAtivo";

export default function PaginaAtivos() {
  const [ativoIdSelecionado, setAtivoIdSelecionado] = useState<number | null>(null);

  return (
<div className="flex h-screen overflow-hidden">
  {/* Sidebar fixa */}
  <div className="w-80 shrink-0 border-r border-gray-200 h-full overflow-y-auto">
    <Sidebar onSelecionarAtivo={(id) => setAtivoIdSelecionado(id)} />
  </div>

  {/* Conteúdo com scroll */}
  <main className="flex-1 overflow-y-auto p-4 bg-gray-50 h-full">
    <Suspense fallback={<div className="p-8">Carregando...</div>}>
      {ativoIdSelecionado ? (
        <DetalhesAtivo ativoId={ativoIdSelecionado} />
      ) : (
        <CardAtivo />
      )}
    </Suspense>
  </main>
</div>

  );
}
