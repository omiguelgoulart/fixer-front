'use client';

import dynamic from 'next/dynamic';
import type { OrdemServicoItf } from '@/app/utils/types/planejamento/OSItf'; // Você já deve ter este import

// --- Adicione estes tipos aqui ---
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
  porTipo: { name: string, value: number }[];
  porStatus: { name: string, value: number }[];
}
interface DashboardData {
  kpis: Kpis;
  indicadoresDesempenho: Indicadores;
  distribuicao: Distribuicao;
  alertasENotificacoes: OrdemServicoItf[];
  proximasManutencoes: OrdemServicoItf[];
}
// --- Fim dos tipos ---

const DashboardPrincipal = dynamic(
  () => import('@/app/dashboard/components/DashboardPrincipal').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => <p className="p-4 text-center">Carregando dashboard...</p> 
  }
);

interface DashboardLoaderProps {
  initialData: DashboardData | null;
}

export default function DashboardLoader({ initialData }: DashboardLoaderProps) {
  return <DashboardPrincipal initialData={initialData} />;
}