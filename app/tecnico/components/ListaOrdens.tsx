
import Link from "next/link";
import type { OrdemServico } from "@/types/planejamento";
import CardOrdemServico from "./CardOrdemServico";

export default function ListaOrdens({ ordens }: { ordens: OrdemServico[] }) {

    

  return (
    <div className="space-y-4">
      {ordens.map((ordem) => (
        <Link key={ordem.id} href={`/tecnico/ordem/${ordem.id}`}>
          <CardOrdemServico ordem={ordem} />
        </Link>
      ))}
    </div>
  );
}
