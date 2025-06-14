import { Card, CardContent } from "@/components/ui/card"
import type { OrdemServico } from "@/types/planejamento"

export default function EstatisticasOrdens({ ordens }: { ordens: OrdemServico[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{ordens.length}</div>
          <div className="text-sm text-gray-500">Total</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {ordens.filter((o) => o.status === "Em aberto").length}
          </div>
          <div className="text-sm text-gray-500">Em Aberto</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {ordens.filter((o) => o.prioridade === "Alta").length}
          </div>
          <div className="text-sm text-gray-500">Alta Prioridade</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {ordens.filter((o) => o.status === "Concluída").length}
          </div>
          <div className="text-sm text-gray-500">Concluídas</div>
        </CardContent>
      </Card>
    </div>
  )
}
