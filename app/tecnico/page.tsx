"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Clock, MapPin, User, Plus, Wrench } from "lucide-react"
import { ordensServico } from "@/lib/data"
import Link from "next/link"
import type { OrdemServico } from "@/types/planejamento"



export default function TecnicoPage() {
  const [busca, setBusca] = useState("")
  const [ordens, setOrdens] = useState(ordensServico)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [novaOrdem, setNovaOrdem] = useState({
    titulo: "",
    prioridade: "",
    responsavel: "",
    ativo: "",
    localizacao: "",
    dataVencimento: "",
    tipoManutencao: "",
    descricao: "",
  })

  const ordensFiltradas = ordens.filter(
    (ordem) =>
      ordem.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      ordem.ativo.toLowerCase().includes(busca.toLowerCase()) ||
      ordem.localizacao.toLowerCase().includes(busca.toLowerCase()),
  )

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

  const adicionarOrdem = () => {
    const novoId = Math.max(...ordens.map((o) => o.id)) + 1

    const tarefasExemplo = [
      { id: novoId * 10 + 1, descricao: "Inspeção inicial do equipamento" },
      { id: novoId * 10 + 2, descricao: "Executar procedimento de manutenção" },
      { id: novoId * 10 + 3, descricao: "Teste de funcionamento" },
      { id: novoId * 10 + 4, descricao: "Limpeza e organização da área" },
    ]

    const insumosExemplo = [
      { id: novoId * 10 + 1, nome: "Material de limpeza", codigo: "ML001", quantidade: "1 kit" },
      { id: novoId * 10 + 2, nome: "Lubrificante universal", codigo: "LU001", quantidade: "500ml" },
    ]

    const ordemCompleta: OrdemServico = {
      id: novoId,
      titulo: novaOrdem.titulo,
      status: "Em aberto",
      prioridade: novaOrdem.prioridade,
      responsavelId: "TECH001",
      responsavel: novaOrdem.responsavel,
      ativo: novaOrdem.ativo,
      localizacaoId: "LOC001",
      localizacao: novaOrdem.localizacao,
      dataInicioPlanejada: new Date().toLocaleDateString("pt-BR"),
      dataVencimento: novaOrdem.dataVencimento,
      tipoManutencao: novaOrdem.tipoManutencao,
      tarefas: tarefasExemplo,
      insumos: insumosExemplo,
    }

    setOrdens([ordemCompleta, ...ordens])
    setDialogAberto(false)
    setNovaOrdem({
      titulo: "",
      prioridade: "",
      responsavel: "",
      ativo: "",
      localizacao: "",
      dataVencimento: "",
      tipoManutencao: "",
      descricao: "",
    })
  }

  return (
    <div className="min-h-full bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Minhas Ordens de Serviço</h1>
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Ordem
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5" />
                    Criar Nova Ordem de Serviço
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="titulo">Título da Ordem</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: Manutenção preventiva do motor"
                      value={novaOrdem.titulo}
                      onChange={(e) => setNovaOrdem({ ...novaOrdem, titulo: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="prioridade">Prioridade</Label>
                    <Select
                      value={novaOrdem.prioridade}
                      onValueChange={(value) => setNovaOrdem({ ...novaOrdem, prioridade: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Input
                      id="responsavel"
                      placeholder="Nome do técnico responsável"
                      value={novaOrdem.responsavel}
                      onChange={(e) => setNovaOrdem({ ...novaOrdem, responsavel: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ativo">Equipamento/Ativo</Label>
                    <Input
                      id="ativo"
                      placeholder="Ex: Motor Honda v12"
                      value={novaOrdem.ativo}
                      onChange={(e) => setNovaOrdem({ ...novaOrdem, ativo: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="localizacao">Localização</Label>
                    <Input
                      id="localizacao"
                      placeholder="Ex: Sala de máquinas"
                      value={novaOrdem.localizacao}
                      onChange={(e) => setNovaOrdem({ ...novaOrdem, localizacao: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipoManutencao">Tipo de Manutenção</Label>
                    <Select
                      value={novaOrdem.tipoManutencao}
                      onValueChange={(value) => setNovaOrdem({ ...novaOrdem, tipoManutencao: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Preventiva">Preventiva</SelectItem>
                        <SelectItem value="Corretiva">Corretiva</SelectItem>
                        <SelectItem value="Preditiva">Preditiva</SelectItem>
                        <SelectItem value="Emergencial">Emergencial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                    <Input
                      id="dataVencimento"
                      type="date"
                      value={novaOrdem.dataVencimento}
                      onChange={(e) =>
                        setNovaOrdem({
                          ...novaOrdem,
                          dataVencimento: new Date(e.target.value).toLocaleDateString("pt-BR"),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição (Opcional)</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva detalhes adicionais da manutenção..."
                      value={novaOrdem.descricao}
                      onChange={(e) => setNovaOrdem({ ...novaOrdem, descricao: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={adicionarOrdem}
                    className="w-full"
                    disabled={!novaOrdem.titulo || !novaOrdem.prioridade || !novaOrdem.responsavel || !novaOrdem.ativo}
                  >
                    Criar Ordem de Serviço
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-gray-600">Visualize e gerencie suas ordens de manutenção</p>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{ordens.length}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {ordens.filter((o) => o.status === "Em aberto").length}
                </div>
                <div className="text-sm text-gray-500">Em Aberto</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {ordens.filter((o) => o.prioridade === "Alta").length}
                </div>
                <div className="text-sm text-gray-500">Alta Prioridade</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {ordens.filter((o) => o.status === "Concluída").length}
                </div>
                <div className="text-sm text-gray-500">Concluídas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Busca */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar por título, ativo ou localização..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Lista de Ordens */}
        <div className="space-y-4">
          {ordensFiltradas.map((ordem) => (
            <Link key={ordem.id} href={`/tecnico/ordem/${ordem.id}`}>
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

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Ativo */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Ativo:</span>
                      <span>{ordem.ativo}</span>
                    </div>

                    {/* Localização */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{ordem.localizacao}</span>
                    </div>

                    {/* Responsável */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{ordem.responsavel}</span>
                    </div>

                    {/* Data de Vencimento */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Vencimento: {ordem.dataVencimento}</span>
                    </div>

                    {/* Tipo de Manutenção */}
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {ordem.tipoManutencao}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {ordensFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">Nenhuma ordem encontrada</p>
          </div>
        )}
      </div>
    </div>
  )
}
