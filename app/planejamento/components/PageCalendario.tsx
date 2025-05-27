"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulação de dados de manutenções
const manutencoes = [
  { id: 1, titulo: "Lubrificação preventiva", data: "2025-04-14", prioridade: "Alta", ativo: "Motor Honda v12" },
  { id: 2, titulo: "Troca de filtros", data: "2025-04-15", prioridade: "Média", ativo: "Compressor Atlas" },
  { id: 3, titulo: "Inspeção elétrica", data: "2025-04-16", prioridade: "Baixa", ativo: "Painel de controle" },
  {
    id: 4,
    titulo: "Calibração de sensores",
    data: "2025-04-18",
    prioridade: "Alta",
    ativo: "Sistema de monitoramento",
  },
  { id: 5, titulo: "Manutenção preventiva", data: "2025-04-20", prioridade: "Média", ativo: "Esteira transportadora" },
]

// Função para gerar dias do mês
const gerarDiasDoMes = (ano: number, mes: number) => {
  const primeiroDia = new Date(ano, mes, 1).getDay()
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()

  const dias = []

  // Adicionar dias vazios para alinhar com o dia da semana correto
  for (let i = 0; i < primeiroDia; i++) {
    dias.push({ dia: 0, manutencoes: [] })
  }

  // Adicionar os dias do mês
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`
    const manutencoesNoDia = manutencoes.filter((m) => m.data === dataStr)
    dias.push({ dia, manutencoes: manutencoesNoDia })
  }

  return dias
}

export default function CalendarioManutencoes() {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth())
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())

  const diasDoMes = gerarDiasDoMes(anoAtual, mesAtual)
  const nomeMes = new Date(anoAtual, mesAtual).toLocaleString("pt-BR", { month: "long" })

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11)
      setAnoAtual(anoAtual - 1)
    } else {
      setMesAtual(mesAtual - 1)
    }
  }

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0)
      setAnoAtual(anoAtual + 1)
    } else {
      setMesAtual(mesAtual + 1)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={mesAnterior}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium capitalize">
              {nomeMes} {anoAtual}
            </h2>
            <Button variant="outline" size="icon" onClick={proximoMes}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Select defaultValue="todos">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os tipos</SelectItem>
              <SelectItem value="preventiva">Preventiva</SelectItem>
              <SelectItem value="corretiva">Corretiva</SelectItem>
              <SelectItem value="preditiva">Preditiva</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
            <div key={dia} className="text-center font-medium p-2 text-sm">
              {dia}
            </div>
          ))}

          {diasDoMes.map((dia, index) => (
            <div key={index} className={`border rounded-md p-1 min-h-[100px] ${dia.dia === 0 ? "bg-gray-50" : ""}`}>
              {dia.dia > 0 && (
                <>
                  <div className="text-right text-sm text-gray-500 mb-1">{dia.dia}</div>
                  <div className="space-y-1">
                    {dia.manutencoes.map((manutencao) => (
                      <div
                        key={manutencao.id}
                        className={`text-xs p-1 rounded truncate ${
                          manutencao.prioridade === "Alta"
                            ? "bg-red-100 text-red-800"
                            : manutencao.prioridade === "Média"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                        title={`${manutencao.titulo} - ${manutencao.ativo}`}
                      >
                        {manutencao.titulo}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
