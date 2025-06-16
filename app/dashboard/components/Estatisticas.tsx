'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Wrench, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Kpis {
  manutencoesPendentes: number;
  manutencoesAtrasadas: number;
  ativosComAlertas: number;
  disponibilidadeGeral: number;
}

interface EstatisticasProps {
  kpis: Kpis;
}

export default function Estatisticas({ kpis }: EstatisticasProps) {
  const cardStyle = "rounded-md shadow-sm bg-white p-4 flex flex-col justify-between h-full";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Manutenções Pendentes */}
      <Card className={`${cardStyle} border-l-4 border-blue-500`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Manutenções Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wrench className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{kpis.manutencoesPendentes}</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/planejamento" className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700">
                Ver <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manutenções Atrasadas */}
      <Card className={`${cardStyle} border-l-4 border-red-500`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Manutenções Atrasadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-2xl font-bold">{kpis.manutencoesAtrasadas}</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/planejamento?filtro=atrasadas" className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
                Resolver <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Ativos com Alertas */}
      <Card className={`${cardStyle} border-l-4 border-yellow-500`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Ativos com Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold">{kpis.ativosComAlertas}</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ativos?filtro=alertas" className="flex items-center gap-1 text-xs text-yellow-500 hover:text-yellow-700">
                Verificar <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disponibilidade Geral */}
      <Card className={`${cardStyle} border-l-4 border-green-500`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Disponibilidade Geral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{kpis.disponibilidadeGeral}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
