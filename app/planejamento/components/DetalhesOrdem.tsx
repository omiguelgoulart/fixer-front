"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Printer, Trash, Pencil } from "lucide-react"
import AbaGeral from "./abas/Geral"
import AbaAtividades from "./abas/Atividade"
import AbaApontamentos from "./abas/Apontamentos"
import AbaItens from "./abas/Itens"
// import AbaProcedimentos from "./abas/Procedimentos"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import ModalEditarOrdem from "./ModalEditar"
import { toast } from "sonner"
import Router from "next/router"

interface Props {
  ordem: OrdemServicoItf | null
}

export default function DetalhesOrdem({ ordem }: Props) {
  const [loading, setLoading] = useState(false)
  const [editarAberto, setEditarAberto] = useState(false)

  const handleExcluir = async () => {
    if (!ordem) return

    const confirm = window.confirm(`Deseja realmente excluir a OS #${ordem.codigo}?`)
    if (!confirm) return

    setLoading(true)

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`, {
        method: "DELETE",
      })

      toast.success(`Ordem de serviço #${ordem.codigo} excluída com sucesso!`)
      // aqui você pode dar um reload da lista, ou navegar para outra tela, ou fechar o modal se estiver em um modal
    } catch (error) {
      console.error("Erro ao excluir OS:", error)
      toast.error("Erro ao excluir ordem de serviço.")
    } finally {
      setLoading(false)
    }
  }

  async function handleAlterarStatus(novoStatus: "EM_ABERTO" | "CONCLUIDA") {
    if (!ordem)// Redireciona se não houver ordem selecionada
      return

    setLoading(true)

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: novoStatus,
        }),
      })
      toast.success(`Status alterado para ${novoStatus === "EM_ABERTO" ? "Em Aberto" : "Concluída"}!`)
      // Redireciona para a página de ordens de serviço ou atualiza a lista
      Router.push("/planejamento") // ou a rota que você usa para listar as OS
      // você pode recarregar os detalhes da OS aqui se quiser
    } catch (error) {
      console.error("Erro ao atualizar status:", error)
      toast.error("Erro ao atualizar status da ordem de serviço.")
    } finally {
      setLoading(false)
    }
  }
  if (!ordem) {
    return <div className="p-8 text-center text-gray-500">Selecione uma ordem para visualizar os detalhes</div>
  }
  return (
    <div>
      <div className="p-4 border-b flex justify-between items-center">
      <div>
        <span className="text-gray-500 text-sm">#{ordem.codigo}</span>
        <h2 className="font-medium">{ordem.titulo}</h2>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="icon">
        <Printer className="h-5 w-5" />
        </Button>

        {/* Botão editar */}
        <Button
        variant="outline"
        size="icon"
        onClick={() => setEditarAberto(true)}
        disabled={loading}
        >
        <Pencil className="h-5 w-5" />
        </Button>

        {/* Botão excluir */}
        <Button
        variant="destructive"
        size="icon"
        onClick={handleExcluir}
        disabled={loading}
        >
        <Trash className="h-5 w-5" />
        </Button>
      </div>
      </div>

      <Tabs defaultValue="geral">
      <TabsList className="px-4 pt-2">
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="atividades">Atividades</TabsTrigger>
        <TabsTrigger value="apontamentos">Apontamentos</TabsTrigger>
        <TabsTrigger value="itens">Itens</TabsTrigger>
        <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
      </TabsList>

      <TabsContent value="geral">
        <AbaGeral ordem={ordem} />
      </TabsContent>

      <TabsContent value="atividades">
        <AbaAtividades ordem={ordem} />
      </TabsContent>

      <TabsContent value="apontamentos">
        <AbaApontamentos ordem={ordem} />
      </TabsContent>

      <TabsContent value="itens">
        <AbaItens ordem={ordem} />
      </TabsContent>
      </Tabs>

      {/* Footer com botões de status */}
      <div className="p-4 border-t flex justify-end gap-2">
      {ordem.status !== "EM_ABERTO" && (
        <Button
        variant="secondary"
        onClick={() => handleAlterarStatus("EM_ABERTO")}
        disabled={loading}
        >
        Marcar como Em Aberto
        </Button>
      )}

      {ordem.status !== "CONCLUIDA" && (
        <Button
        variant="secondary"
        onClick={() => handleAlterarStatus("CONCLUIDA")}
        disabled={loading}
        >
        Marcar como Concluída
        </Button>
      )}
      </div>

      {/* ModalEditarOrdem */}
      <ModalEditarOrdem
      ordem={ordem}
      open={editarAberto}
      onClose={() => setEditarAberto(false)}
      />
    </div>
  )
}
