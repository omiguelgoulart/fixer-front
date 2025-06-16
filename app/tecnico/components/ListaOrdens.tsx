

import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import CardOrdemServico from "./CardOrdemServico";

interface Props {
  ordens: OrdemServicoItf[];
  onSelect: (ordem: OrdemServicoItf) => void;
}

export default function ListaOrdens({ ordens, onSelect }: Props) {
  return (
    <div className="space-y-4">
      {ordens.map((ordem) => (
        <div key={ordem.id} onClick={() => onSelect(ordem)}>
          <CardOrdemServico ordem={ordem} />
        </div>
      ))}
    </div>
  );
}
