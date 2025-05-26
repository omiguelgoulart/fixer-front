"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AtivoItf } from "@/app/utils/types/AtivoITF"
import { Button } from "@/components/ui/button"
import ModalEditarAtivo from "./ModalEditarAtivo"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Pencil, Trash2, X } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



interface DetalhesAtivoProps {
  ativoId: number
  onVoltar: () => void
}

export default function DetalhesAtivo({ ativoId, onVoltar }: DetalhesAtivoProps) {
  const [ativo, setAtivo] = useState<AtivoItf | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [confirmarExclusao, setConfirmarExclusao] = useState(false)

  async function fetchAtivo() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativoId}`)
      if (!response.ok) throw new Error("Erro ao carregar dados")
      const dados = await response.json()
      setAtivo(dados)
    } catch (error) {
      console.error(error)
    } finally {
      setCarregando(false)
    }
  }

  async function excluirAtivo() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativoId}`, {
        method: "DELETE"
      })
      if (!response.ok) throw new Error("Erro ao excluir ativo")
      toast.success("Ativo excluído com sucesso")
      setConfirmarExclusao(false)
      onVoltar()
    } catch (error) {
      console.error(error)
      toast.error("Erro ao excluir ativo")
    }
  }

  useEffect(() => {
    fetchAtivo()
  }, [ativoId])

  if (carregando) {
    return (
      <div className="py-4 px-2 animate-pulse space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  if (!ativo) return <p className="text-gray-500">Ativo não encontrado.</p>

  const obterCorCriticidade = (criticidade: string) => {
    switch (criticidade.toUpperCase()) {
      case "ALTA":
        return "bg-red-500"
      case "MEDIA":
        return "bg-yellow-500"
      case "BAIXA":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const obterCorSituacao = (situacao: string) => {
    switch (situacao.toUpperCase()) {
      case "ATIVO":
        return "bg-green-500"
      case "INATIVO":
        return "bg-gray-500"
      case "MANUTENCAO":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-4">{ativo.nome}</h2>
          <div className="flex gap-2">
            <Badge className={obterCorSituacao(ativo.situacao)}>{ativo.situacao}</Badge>
            <Badge className={obterCorCriticidade(ativo.criticidade)}>Criticidade: {ativo.criticidade}</Badge>
          </div>
        </div>

<TooltipProvider>
  <div className="flex gap-3">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="default" size="icon" onClick={() => setModalAberto(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Editar</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="destructive" size="icon" onClick={() => setConfirmarExclusao(true)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Excluir</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" onClick={onVoltar}>
          <X className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Fechar</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>


      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <img
              src={ativo.foto || "/placeholder.png"}
              alt={ativo.nome}
              className="object-contain rounded-md border border-gray-200"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
            <div>
              <p className="font-semibold">Código:</p>
              <p>{ativo.codigo}</p>
            </div>
            <div>
              <p className="font-semibold">Fabricante:</p>
              <p>{ativo.fabricante}</p>
            </div>
            <div>
              <p className="font-semibold">Modelo:</p>
              <p>{ativo.modelo}</p>
            </div>
            <div>
              <p className="font-semibold">Tipo:</p>
              <p>{ativo.tipo_ativo}</p>
            </div>
            <div>
              <p className="font-semibold">Data de Aquisição:</p>
              <p>{ativo.data_aquisicao?.split("T")[0]}</p>
            </div>
            <div>
              <p className="font-semibold">Localização Interna:</p>
              <p>{ativo.localizacao_interna || "-"}</p>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Subativos:</p>
            {ativo.subativos?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {ativo.subativos.map((sub) => (
                  <li key={sub.id}>
                    {sub.nome}
                    <span className="text-xs text-gray-500 ml-2">({sub.codigo})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum subativo cadastrado.</p>
            )}
          </div>

          <div className="mt-6">
            <p className="font-semibold text-gray-700">📜 Histórico de Falhas:</p>
            <p className="text-sm text-gray-400">Em breve você poderá consultar falhas registradas deste ativo.</p>
          </div>
        </div>
      </div>

      {modalAberto && ativo && (
        <ModalEditarAtivo
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          ativo={ativo}
          aoAtualizar={fetchAtivo}
        />
      )}

      <Dialog open={confirmarExclusao} onOpenChange={setConfirmarExclusao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente excluir este ativo?</DialogTitle>
            <p className="text-sm text-gray-500">Essa ação não poderá ser desfeita.</p>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmarExclusao(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={excluirAtivo}>Confirmar exclusão</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
