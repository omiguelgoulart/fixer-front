// components/OrdemInfo.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { getPrioridadeColor } from "./utils";

export default function OrdemInfo({ ordem }: { ordem: OrdemServicoItf }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Informações Gerais</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Código da Ordem */}
          <div>
            <p className="text-sm text-gray-500">Código da Ordem</p>
            <p className="font-medium">{ordem.codigo}</p>
          </div>

          {/* Ativo */}
          <div>
            <p className="text-sm text-gray-500">Ativo</p>
            <p className="font-medium">{ordem.ativo?.nome}</p>
          </div>

          {/* Localização do Ativo */}
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Localização</p>
              <p className="font-medium">{ordem.ativo?.localizacao_interna}</p>
            </div>
          </div>

          {/* Responsável */}
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Responsável</p>
              <p className="font-medium"> {ordem.responsavel?.nome}</p>
            </div>
          </div>

          {/* Prioridade */}
          <div>
            <p className="text-sm text-gray-500">Prioridade</p>
            <Badge
              variant="outline"
              className={`text-xs ${getPrioridadeColor(ordem.prioridade)}`}
            >
              {ordem.prioridade.charAt(0) + ordem.prioridade.slice(1).toLowerCase()}
            </Badge>
          </div>

          {/* Tipo de Manutenção */}
          <div>
            <p className="text-sm text-gray-500">Tipo de Manutenção</p>
        <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
          {ordem.tipoManutencao.charAt(0) +
            ordem.tipoManutencao.slice(1).toLowerCase()}
        </Badge>
          </div>

          {/* Data Início Planejada */}
          <div>
            <p className="text-sm text-gray-500">Início Planejado</p>
            <p className="font-medium">
              {new Date(ordem.dataInicioPlanejada).toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Data de Vencimento */}
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">Vencimento</p>
              <p className="font-medium">
                {new Date(ordem.dataVencimento).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          {/* Criado em */}
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
