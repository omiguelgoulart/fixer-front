// ListaOrdens.tsx
"use client";

import React from "react";
import CardPlanejamentoOrdem from "./CardOrdemPlanejamento";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

interface Props {
  ordens: OrdemServicoItf[];
  onSelect: (ordem: OrdemServicoItf) => void;
}

export default function ListaOrdens({ ordens, onSelect }: Props) {
  return (
    <ul>
      {ordens.map((ordem) => (
        <li key={ordem.id}>
          <CardPlanejamentoOrdem
            ordem={ordem}
            selecionada={false} // ou controle de seleção se quiser
            onClick={() => onSelect(ordem)}
          />
        </li>
      ))}
    </ul>
  );
}
