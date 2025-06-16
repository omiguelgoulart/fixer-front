import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  ordens: OrdemServicoItf[];
}

export default function EstatisticasOrdens({ ordens }: Props) {
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
            {ordens.filter((o) => o.status === "EM_ABERTO").length}
          </div>
          <div className="text-sm text-gray-500">Em Aberto</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {ordens.filter((o) => o.prioridade === "ALTA").length}
          </div>
          <div className="text-sm text-gray-500">Alta Prioridade</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {ordens.filter((o) => o.status === "CONCLUIDA").length}
          </div>
          <div className="text-sm text-gray-500">Concluídas</div>
        </CardContent>
      </Card>
    </div>
  )
}
