// planejamento/components/PageCalendario.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // Importando o Badge
import { Label } from "@/components/ui/label"
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface CalendarioProps {
  ordensAgrupadas: Map<string, OrdemServicoItf[]>;
}

const gerarDiasDoMes = (ano: number, mes: number, ordensAgrupadas: Map<string, OrdemServicoItf[]>) => {
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const dias = [];

  for (let i = 0; i < primeiroDia; i++) {
    dias.push({ dia: 0, ordens: [] });
  }

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dataStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const ordensNoDia = ordensAgrupadas.get(dataStr) || [];
    dias.push({ dia, ordens: ordensNoDia });
  }

  return dias;
}

export default function CalendarioManutencoes({ ordensAgrupadas }: CalendarioProps) {
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  
  // 1. Estados para controlar o modal
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null);

  const diasDoMes = gerarDiasDoMes(anoAtual, mesAtual, ordensAgrupadas);
  const nomeMes = new Date(anoAtual, mesAtual).toLocaleString("pt-BR", { month: "long" });

  const mesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  }

  const proximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  }

  // 2. Função para abrir o modal com a OS correta
  const handleAbrirModal = (ordem: OrdemServicoItf) => {
    setOrdemSelecionada(ordem);
  }

  // Função para fechar o modal
  const handleFecharModal = () => {
    setOrdemSelecionada(null);
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={mesAnterior}><ChevronLeft className="h-4 w-4" /></Button>
              <h2 className="text-lg font-medium capitalize">{nomeMes} {anoAtual}</h2>
              <Button variant="outline" size="icon" onClick={proximoMes}><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filtrar por tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
                <SelectItem value="CORRETIVA">Corretiva</SelectItem>
                <SelectItem value="PREDITIVA">Preditiva</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
              <div key={dia} className="text-center font-medium p-2 text-sm text-gray-500">{dia}</div>
            ))}

            {diasDoMes.map((diaInfo, index) => (
              <div key={index} className={`border rounded-md p-1 min-h-[120px] ${diaInfo.dia === 0 ? "bg-gray-50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-900"}`}>
                {diaInfo.dia > 0 && (
                  <>
                    <div className="text-right text-xs text-gray-400 mb-1">{diaInfo.dia}</div>
                    <div className="space-y-1">
                      {diaInfo.ordens.map((ordem) => (
                        // 3. Adicionado o onClick para abrir o modal
                        <div
                          key={ordem.id}
                          onClick={() => handleAbrirModal(ordem)}
                          className={`text-xs p-1 rounded truncate cursor-pointer ${
                            ordem.prioridade === "ALTA"
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : ordem.prioridade === "MEDIA"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                          title={`${ordem.titulo} - Ativo: ${ordem.ativo.nome}`}
                        >
                          {ordem.titulo}
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
      
      {/* 4. O componente Dialog que renderiza o modal */}
      <Dialog open={!!ordemSelecionada} onOpenChange={(isOpen) => !isOpen && handleFecharModal()}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Ordem de Serviço</DialogTitle>
            <DialogDescription>
              {ordemSelecionada?.codigo} - {ordemSelecionada?.titulo}
            </DialogDescription>
          </DialogHeader>
          {ordemSelecionada && (
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-4">
              <div>
                <Label className="text-sm text-gray-500">Status</Label>
                <Badge 
                  className={ordemSelecionada.status === 'CONCLUIDA' ? 'bg-gray-200 text-gray-700' : 'bg-blue-100 text-blue-700'}>
                    {ordemSelecionada.status.replace("_", " ").toLowerCase()}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Prioridade</Label>
                <Badge 
                  className={
                    ordemSelecionada.prioridade === 'ALTA' ? 'bg-red-500' : 
                    ordemSelecionada.prioridade === 'MEDIA' ? 'bg-yellow-500' : 'bg-green-500'
                  }>
                    {ordemSelecionada.prioridade}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Responsável</Label>
                <p className="font-medium">{ordemSelecionada.responsavel.nome}</p>
              </div>
               <div>
                <Label className="text-sm text-gray-500">Ativo</Label>
                <p className="font-medium">{ordemSelecionada.ativo.nome}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Data de Início Planejada</Label>
                <p className="font-medium">
                  {format(new Date(ordemSelecionada.dataInicioPlanejada), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Data de Vencimento</Label>
                <p className="font-medium">
                  {format(new Date(ordemSelecionada.dataVencimento), "dd 'de' MMMM, yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Tipo de Manutenção</Label>
                <p className="font-medium">#{ordemSelecionada.tipoManutencao}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Localização do Ativo</Label>
                {/* Supondo que a localização venha do ativo relacionado */}
                <p className="font-medium">{ordemSelecionada.ativo.localizacao_interna || "Não especificada"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}