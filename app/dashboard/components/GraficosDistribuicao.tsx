// app/dashboard/components/GraficosDistribuicao.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

interface GraficoData {
  name: string
  value: number
}

interface GraficosDistribuicaoProps {
  dados: {
    porTipo: GraficoData[]
    porStatus: GraficoData[]
  }
}

export default function GraficosDistribuicao({ dados }: GraficosDistribuicaoProps) {
  const formatLabels = (arr: GraficoData[]) =>
    arr.map((d) => d.name.charAt(0).toUpperCase() + d.name.slice(1).toLowerCase().replace(/_/g, ' '))

  const tipoData = {
    labels: formatLabels(dados.porTipo),
    datasets: [
      {
        label: 'Tipo de Manutenção',
        data: dados.porTipo.map((d) => d.value),
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
      },
    ],
  }

  const statusData = {
    labels: formatLabels(dados.porStatus),
    datasets: [
      {
        label: 'Status',
        data: dados.porStatus.map((d) => d.value),
        backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Manutenções</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-md font-medium mb-4">Por Tipo</h3>
          <Pie data={tipoData} />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-md font-medium mb-4">Por Status</h3>
          <Bar
            data={statusData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
