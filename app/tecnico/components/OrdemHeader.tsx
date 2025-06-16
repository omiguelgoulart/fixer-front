// components/OrdemHeader.tsx
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";


interface Props {
  ordem: OrdemServicoItf;
  onVoltar: () => void;
   customActions?: ReactNode;
}

export default function OrdemHeader({ ordem, onVoltar, customActions  }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em aberto":
        return "bg-yellow-100 text-yellow-800";
      case "Concluída":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Média":
        return "bg-orange-100 text-orange-800";
      case "Baixa":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="sticky top-0 bg-white border-b z-10 p-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onVoltar} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500">#{ordem.id}</span>
            <Badge className={getStatusColor(ordem.status)}>{ordem.status}</Badge>
            <Badge className={getPrioridadeColor(ordem.prioridade)}>{ordem.prioridade}</Badge>
          </div>
          <h1 className="font-semibold text-gray-900 truncate">{ordem.titulo}</h1>
        </div>
      </div>

      {customActions && (
        <div className="mt-2 flex items-center gap-2">
          {customActions}
        </div>
      )}
    </div>
  );
}
