"use client";

import React from "react";
import CardPlanejamentoOrdem from "./CardOrdemPlanejamento";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

interface Props {
  ordens: OrdemServicoItf[];
  ordemSelecionada: OrdemServicoItf | null;
  onSelect: (ordem: OrdemServicoItf) => void;
}

export default function ListaOrdens({ ordens, ordemSelecionada, onSelect }: Props) {
  return (
    <ul>
      {ordens.map((ordem) => (
        <li key={ordem.id}>
          <CardPlanejamentoOrdem
            ordem={ordem}
            selecionada={ordemSelecionada?.id === ordem.id}
            onClick={() => onSelect(ordem)}
          />
        </li>
      ))}
    </ul>
  );
}
