import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, User } from "lucide-react"
import type { OrdemServico } from "@/types/planejamento"
import { getStatusColor, getPrioridadeColor } from "./utils"

export default function CardOrdemServico({ ordem }: { ordem: OrdemServico }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500">#{ordem.id}</span>
              <Badge className={getStatusColor(ordem.status)}>{ordem.status}</Badge>
              <Badge className={getPrioridadeColor(ordem.prioridade)}>{ordem.prioridade}</Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{ordem.titulo}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full" />Ativo: {ordem.ativo}</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{ordem.localizacao}</div>
        <div className="flex items-center gap-2"><User className="h-4 w-4" />{ordem.responsavel}</div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4" />Vencimento: {ordem.dataVencimento}</div>
        <Badge variant="outline" className="text-xs mt-2">{ordem.tipoManutencao}</Badge>
      </CardContent>
    </Card>
  )
}
