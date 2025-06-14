'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Indicadores {
  mtbf: number;
  mttr: number;
  taxaConclusaoPreventivas: number;
  custoPorValor: number;
}

interface Alerta {
  id: number;
  titulo: string;
  dataVencimento: string;
  ativo: { nome: string };
}

interface IndicadoresEAlertasProps {
  indicadores: Indicadores;
  alertas: Alerta[];
}

export default function IndicadoresEAlertas({ indicadores, alertas }: IndicadoresEAlertasProps) {
  const formatarDataRelativa = (dataStr: string) => {
    if (!dataStr) return '';
    return formatDistanceToNow(new Date(dataStr), { addSuffix: true, locale: ptBR });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna dos Indicadores de Desempenho */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Indicadores de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MTBF (Tempo Médio Entre Falhas)</span>
                  <span className="font-medium">{indicadores.mtbf}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((indicadores.mtbf / 150) * 100, 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>MTTR (Tempo Médio Para Reparo)</span>
                  <span className="font-medium">{indicadores.mttr}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.max(100 - (indicadores.mttr * 10), 5)}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coluna de Alertas e Notificações */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Alertas e Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {alertas.length > 0 ? (
                alertas.map(alerta => (
                  <li key={alerta.id} className="py-3 flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-full mt-1">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Manutenção Atrasada</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        A OS &quot;{alerta.titulo}&quot; do ativo {alerta.ativo.nome} está atrasada.
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/planejamento/os/${alerta.id}`}>Ver detalhes</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {formatarDataRelativa(alerta.dataVencimento)}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-sm text-center text-gray-500 py-4">Nenhum alerta crítico no momento.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}