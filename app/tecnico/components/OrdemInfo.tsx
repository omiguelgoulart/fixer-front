// components/OrdemInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

export default function OrdemInfo({ ordem }: { ordem: OrdemServicoItf }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Informações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div>
              <p className="text-sm text-gray-500">Ativo</p>
              <p className="font-medium">{String(ordem.ativo?.nome ?? ordem.ativo?.toString?.() ?? "")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Localização</p>
              <p className="font-medium">{ordem.localizacao}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Responsável</p>
              <p className="font-medium">{ordem.responsavel?.nome ?? ""}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Vencimento</p>
              <p className="font-medium">{ordem.dataVencimento}</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-gray-500 mb-1">Tipo de Manutenção</p>
          <Badge variant="outline">{ordem.tipoManutencao}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
