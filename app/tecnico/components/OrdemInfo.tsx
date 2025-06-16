import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { getPrioridadeColor } from "./utils";

export default function OrdemInfo({ ordem }: { ordem: OrdemServicoItf }) {
  return (
    <Card className="rounded-lg shadow-sm md:rounded-none md:shadow-none md:border-0">
      <CardHeader>
        <CardTitle className="text-lg">Informações Gerais</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Código da Ordem</p>
            <p className="font-medium">{ordem.codigo}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Ativo</p>
            <p className="font-medium">{ordem.ativo?.nome}</p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Localização</p>
              <p className="font-medium">{ordem.ativo?.localizacao_interna}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Responsável</p>
              <p className="font-medium">{ordem.responsavel?.nome}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Prioridade</p>
            <Badge
              variant="outline"
              className={`text-xs ${getPrioridadeColor(ordem.prioridade)}`}
            >
              {ordem.prioridade.charAt(0) + ordem.prioridade.slice(1).toLowerCase()}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tipo de Manutenção</p>
            <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
              {ordem.tipoManutencao.charAt(0) +
                ordem.tipoManutencao.slice(1).toLowerCase()}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Início Planejado</p>
            <p className="font-medium">
              {new Date(ordem.dataInicioPlanejada).toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Vencimento</p>
              <p className="font-medium">
                {new Date(ordem.dataVencimento).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Criado em</p>
            <p className="font-medium">
              {new Date(ordem.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
