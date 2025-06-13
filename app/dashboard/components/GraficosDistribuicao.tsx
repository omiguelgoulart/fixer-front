'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface GraficoData {
  name: string;
  value: number;
}

interface GraficosDistribuicaoProps {
  dados: {
    porTipo: GraficoData[];
    porStatus: GraficoData[];
  }
}

const COLORS_TIPO = ['#3B82F6', '#10B981', '#F59E0B']; // Azul, Verde, Amarelo
const COLORS_STATUS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']; // Verde, Azul, Amarelo, Vermelho

export default function GraficosDistribuicao({ dados }: GraficosDistribuicaoProps) {
  const formatData = (data: GraficoData[]) => data.map(item => ({
    ...item,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase().replace(/_/g, ' ')
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Manutenções</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-md font-medium mb-4">Por Tipo</h3>
          <PieChart width={250} height={250}>
            <Pie data={formatData(dados.porTipo)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {dados.porTipo.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_TIPO[index % COLORS_TIPO.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-md font-medium mb-4">Por Status</h3>
          <BarChart width={300} height={250} data={formatData(dados.porStatus)}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value">
               {dados.porStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_STATUS[index % COLORS_STATUS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </CardContent>
    </Card>
  )
}