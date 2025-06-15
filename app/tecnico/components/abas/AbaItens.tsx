// AbaItens.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

export default function AbaItens({ ordem }: { ordem: OrdemServicoItf }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Itens Necessários</CardTitle></CardHeader>
      <CardContent>
        {ordem.insumos?.length ? (
          <div className="space-y-3">
            {ordem.insumos.map((insumo) => (
              <div key={insumo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{insumo.nome}</p>
                  <p className="text-sm text-gray-500">Código: {insumo.codigo}</p>
                </div>
                <Badge variant="outline">{insumo.quantidade}</Badge>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500 text-center py-8">Nenhum item cadastrado</p>}
      </CardContent>
    </Card>
  )
}