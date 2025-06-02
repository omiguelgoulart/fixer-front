"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, User, Clock, CheckCircle2, FileText, Package, Settings } from "lucide-react"
import { ordensServico } from "@/lib/data"

export default function OrdemTecnicoPage() {
  const params = useParams()
  const router = useRouter()
  const [novoApontamento, setNovoApontamento] = useState("")
  const [tarefasConcluidas, setTarefasConcluidas] = useState<number[]>([])

  const ordem = ordensServico.find((o) => o.id === Number.parseInt(params.id as string))

  if (!ordem) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ordem não encontrada</h2>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

  const toggleTarefa = (tarefaId: number) => {
    setTarefasConcluidas((prev) =>
      prev.includes(tarefaId) ? prev.filter((id) => id !== tarefaId) : [...prev, tarefaId],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em aberto":
        return "bg-yellow-100 text-yellow-800"
      case "Concluída":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-100 text-red-800"
      case "Média":
        return "bg-orange-100 text-orange-800"
      case "Baixa":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo */}
      <div className="sticky top-0 bg-white border-b z-10 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-500">#{ordem.id}</span>
              <Badge className={getStatusColor(ordem.status)}>{ordem.status}</Badge>
              <Badge className={getPrioridadeColor(ordem.prioridade)}>{ordem.prioridade}</Badge>
            </div>
            <h1 className="font-semibold text-gray-900 truncate">{ordem.titulo}</h1>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Informações Gerais */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">Ativo</p>
                  <p className="font-medium">{ordem.ativo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Localização</p>
                  <p className="font-medium">{ordem.localizacao}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Responsável</p>
                  <p className="font-medium">{ordem.responsavel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Vencimento</p>
                  <p className="font-medium">{ordem.dataVencimento}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-500 mb-1">Tipo de Manutenção</p>
              <Badge variant="outline">{ordem.tipoManutencao}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para diferentes seções */}
        <Tabs defaultValue="tarefas" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tarefas" className="text-xs">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="itens" className="text-xs">
              <Package className="h-4 w-4 mr-1" />
              Itens
            </TabsTrigger>
            <TabsTrigger value="procedimentos" className="text-xs">
              <FileText className="h-4 w-4 mr-1" />
              Procedimentos
            </TabsTrigger>
            <TabsTrigger value="apontamentos" className="text-xs">
              <Settings className="h-4 w-4 mr-1" />
              Apontamentos
            </TabsTrigger>
          </TabsList>

          {/* Aba Tarefas */}
          <TabsContent value="tarefas">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lista de Tarefas</CardTitle>
              </CardHeader>
              <CardContent>
                {ordem.tarefas && ordem.tarefas.length > 0 ? (
                  <div className="space-y-3">
                    {ordem.tarefas.map((tarefa) => (
                      <div key={tarefa.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Checkbox
                          checked={tarefasConcluidas.includes(tarefa.id)}
                          onCheckedChange={() => toggleTarefa(tarefa.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <p
                            className={`${tarefasConcluidas.includes(tarefa.id) ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {tarefa.descricao}
                          </p>
                        </div>
                        {tarefasConcluidas.includes(tarefa.id) && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhuma tarefa cadastrada</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Itens */}
          <TabsContent value="itens">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Itens Necessários</CardTitle>
              </CardHeader>
              <CardContent>
                {ordem.insumos && ordem.insumos.length > 0 ? (
                  <div className="space-y-3">
                    {ordem.insumos.map((insumo) => (
                      <div key={insumo.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{insumo.nome}</p>
                          <p className="text-sm text-gray-500">Código: {insumo.codigo}</p>
                        </div>
                        <Badge variant="outline">{insumo.quantidade}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhum item cadastrado</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Procedimentos */}
          <TabsContent value="procedimentos">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Procedimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Procedimento Padrão</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                      <li>Verificar se o equipamento está desligado</li>
                      <li>Realizar inspeção visual</li>
                      <li>Executar as tarefas listadas</li>
                      <li>Testar funcionamento</li>
                      <li>Registrar observações</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba Apontamentos */}
          <TabsContent value="apontamentos">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Apontamentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar Observação</label>
                  <Textarea
                    placeholder="Descreva observações, problemas encontrados ou ações realizadas..."
                    value={novoApontamento}
                    onChange={(e) => setNovoApontamento(e.target.value)}
                    rows={4}
                  />
                  <Button className="mt-2 w-full" disabled={!novoApontamento.trim()}>
                    Salvar Apontamento
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Histórico de Apontamentos</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">João Silva</span>
                        <span className="text-xs text-gray-500">Hoje, 14:30</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Equipamento apresentando ruído anormal. Verificar rolamentos.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Botões de Ação */}
        <div className="sticky bottom-4 mt-6">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12">
              Pausar Ordem
            </Button>
            <Button className="flex-1 h-12 bg-green-600 hover:bg-green-700">Concluir Ordem</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
