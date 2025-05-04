"use client";

import { useState } from "react";
import ArvoreAtivos from "./components/ArvoreAtivo";
import DetalhesAtivo from "./components/DetalheAtivo";

export default function PaginaAtivos() {
  const [ativoIdSelecionado, setAtivoIdSelecionado] = useState<number | null>(null);

  return (
    <div className="flex gap-6">
      <div className="w-1/3">
        <ArvoreAtivos onSelecionarAtivo={(id) => setAtivoIdSelecionado(id)} />
      </div>
      <div className="w-2/3">
        {ativoIdSelecionado ? (
          <DetalhesAtivo ativoId={ativoIdSelecionado} />
        ) : (
          <p className="text-gray-500 mt-10">Selecione um ativo para ver os detalhes.</p>
        )}
      </div>
    </div>
  );
}
