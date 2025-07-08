import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, User } from "lucide-react";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { getStatusColor, getPrioridadeColor } from "./utils";

type Props = {
  ordem: OrdemServicoItf;
};

export default function CardOrdemServico({ ordem }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500">{ordem.codigo}</span>
              <Badge className={getStatusColor(ordem.status)}>
                {ordem.status.replace("_", " ").toUpperCase()}
              </Badge>
              <Badge className={getPrioridadeColor(ordem.prioridade)}>
                {ordem.prioridade}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight">
              {ordem.titulo}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Ativo: {ordem.ativo?.nome ?? "Não informado"}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {ordem.ativo?.localizacao_interna ?? "Sem localização"}
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {ordem.responsavel?.nome ?? "Responsável não informado"}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Vencimento:{" "}
          {new Date(ordem.dataVencimento).toLocaleDateString("pt-BR")}
        </div>
        <Badge variant="outline" className="text-xs mt-2">
          {ordem.tipoManutencao.charAt(0) +
            ordem.tipoManutencao.slice(1).toLowerCase()}
        </Badge>
      </CardContent>
    </Card>
  );
}
