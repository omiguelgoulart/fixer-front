"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import Estatisticas from "./Estatisticas";
import { AlertTriangle, Calendar, Clock } from "lucide-react";

// Tipos para os dados que vêm da API
interface Kpis {
  manutencoesPendentes: number;
  manutencoesAtrasadas: number;
  ativosComAlertas: number;
  disponibilidadeGeral: number;
}
interface Indicadores {
  mtbf: number;
  mttr: number;
  taxaConclusaoPreventivas: number;
  custoPorValor: number;
}
interface Distribuicao {
  porTipo: { name: string; value: number }[];
  porStatus: { name: string; value: number }[];
}
interface DashboardData {
  kpis: Kpis;
  indicadoresDesempenho: Indicadores;
  distribuicao: Distribuicao;
  alertasENotificacoes: OrdemServicoItf[];
  proximasManutencoes: OrdemServicoItf[];
}

interface DashboardPrincipalProps {
  initialData: DashboardData | null;
}

const COLORS_TIPO = ["#3B82F6", "#10B981", "#F59E0B"]; // Azul, Verde, Amarelo
const COLORS_STATUS = ["#22C55E", "#3B82F6", "#F59E0B", "#EF4444"]; // Verde, Azul, Amarelo, Vermelho

export default function DashboardPrincipal({
  initialData,
}: DashboardPrincipalProps) {
  if (!initialData) {
    return (
      <div className="text-center p-8 text-red-500">
        Não foi possível carregar os dados do dashboard.
      </div>
    );
  }
  const {
    kpis,
    indicadoresDesempenho,
    proximasManutencoes,
    distribuicao,
    alertasENotificacoes,
  } = initialData;

  const formatarDataRelativa = (dataStr: string) => {
    if (!dataStr) return "";
    return formatDistanceToNow(new Date(dataStr), {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const formatChartData = (data: { name: string; value: number }[]) =>
    data.map((item) => ({
      ...item,
      name:
        item.name.charAt(0).toUpperCase() +
        item.name.slice(1).toLowerCase().replace(/_/g, " "),
    }));

  return (
    <div className="space-y-6">
      {/* 1. Cards de KPI */}
      <Estatisticas kpis={kpis} />

      {/* 2. Grid Principal: Indicadores, Próximas Manutenções e Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Card de Indicadores de Desempenho */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>MTBF (Tempo Médio Entre Falhas)</span>
                    <span className="font-medium">
                      {indicadoresDesempenho.mtbf}h
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          (indicadoresDesempenho.mtbf / 150) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>MTTR (Tempo Médio Para Reparo)</span>
                    <span className="font-medium">
                      {indicadoresDesempenho.mttr}h
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.max(
                          100 - indicadoresDesempenho.mttr * 10,
                          5
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Card de Distribuição de Manutenções (Gráficos) */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Manutenções</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <h3 className="text-md font-medium mb-4">Por Tipo</h3>
                <PieChart width={250} height={250}>
                  <Pie
                    data={formatChartData(distribuicao.porTipo)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {distribuicao.porTipo.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_TIPO[index % COLORS_TIPO.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-md font-medium mb-4">Por Status</h3>
                <BarChart
                  width={300}
                  height={250}
                  data={formatChartData(distribuicao.porStatus)}
                >
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value">
                    {distribuicao.porStatus.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_STATUS[index % COLORS_STATUS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita: Próximas Manutenções e Alertas */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card de Próximas Manutenções */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Próximas Manutenções</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/planejamento?view=calendario">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Calendário</span>
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {proximasManutencoes.length > 0 ? (
                  proximasManutencoes.map((os) => (
                    <li
                      key={os.id}
                      className="flex justify-between items-center p-2 bg-gray-50 dark:bg-slate-800 rounded-md"
                    >
                      <div>
                        <div className="font-medium text-sm">{os.titulo}</div>
                        <div className="text-xs text-muted-foreground">
                          {os.ativo.nome}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="capitalize">
                          {formatarDataRelativa(os.dataInicioPlanejada)}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-center text-gray-500 py-4">
                    Nenhuma manutenção próxima.
                  </p>
                )}
              </ul>
            </CardContent>
          </Card>
          {/* Card de Alertas e Notificações (agora no final) */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas e Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {alertasENotificacoes.length > 0 ? (
                  alertasENotificacoes.map((alerta) => (
                    <li key={alerta.id} className="py-3 flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-full mt-1">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Manutenção Atrasada</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          A OS &quot;{alerta.titulo}&quot; do ativo{" "}
                          {alerta.ativo.nome} está atrasada.
                        </div>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/planejamento?ordem=${alerta.id}`}>Ver detalhes</Link>
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {formatarDataRelativa(alerta.dataVencimento)}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-center text-gray-500 py-4">
                    Nenhum alerta crítico no momento.
                  </p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
