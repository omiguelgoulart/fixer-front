"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Printer, Trash, Pencil } from "lucide-react";
import AbaGeral from "./abas/Geral";
import AbaApontamentos from "./abas/Apontamentos";
import AbaItens from "./abas/Itens";
// import AbaProcedimentos from "./abas/Procedimentos"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import ModalEditarOrdem from "./ModalEditar";
import { toast } from "sonner";
import Router from "next/router";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Procedimentos from "./abas/Procedimentos";

interface Props {
  ordem: OrdemServicoItf | null;
}

export default function DetalhesOrdem({ ordem }: Props) {
  const [loading, setLoading] = useState(false);
  const [editarAberto, setEditarAberto] = useState(false);

  async function handleExcluir() {
    if (!ordem) return;
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`,
        {
          method: "DELETE",
        }
      );
      toast.success("Ordem de serviço excluída com sucesso!");
      Router.push("/planejamento");
    } catch (error) {
      console.error("Erro ao excluir ordem de serviço:", error);
      toast.error("Erro ao excluir ordem de serviço.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAlterarStatus(novoStatus: "EM_ABERTO" | "CONCLUIDA") {
    if (!ordem) return;
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: novoStatus,
          }),
        }
      );
      toast.success(
        `Status alterado para ${
          novoStatus === "EM_ABERTO" ? "Em Aberto" : "Concluída"
        }!`
      );
      Router.push("/planejamento");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast.error("Erro ao atualizar status da ordem de serviço.");
    } finally {
      setLoading(false);
    }
  }

  if (!ordem) {
    return (
      <div className="p-8 text-center text-gray-500">
        Selecione uma ordem para visualizar os detalhes
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 border-b flex justify-between items-center flex-wrap gap-2 md:flex-nowrap">
        <div>
          <span className="text-gray-500 text-sm">#{ordem.codigo}</span>
          <h2 className="font-medium">{ordem.titulo}</h2>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {/* Botões de status */}
          {ordem.status !== "EM_ABERTO" && (
            <Button
              variant="secondary"
              onClick={() => handleAlterarStatus("EM_ABERTO")}
              disabled={loading}
            >
              Em Aberto
            </Button>
          )}

          {ordem.status !== "CONCLUIDA" && (
            <Button
              variant="secondary"
              onClick={() => handleAlterarStatus("CONCLUIDA")}
              disabled={loading}
            >
              Concluída
            </Button>
          )}

          {/* Botões de ação */}
          <Button variant="ghost" size="icon">
            <Printer className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setEditarAberto(true)}
            disabled={loading}
          >
            <Pencil className="h-5 w-5" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" disabled={loading}>
                <Trash className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir esta ordem de serviço?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleExcluir}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="geral">
        <TabsList className="px-4 pt-2">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="apontamentos">Apontamentos</TabsTrigger>
          <TabsTrigger value="itens">Itens</TabsTrigger>
          <TabsTrigger value="procedimentos">Procedimentos</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <AbaGeral ordem={ordem} />
        </TabsContent>

        <TabsContent value="apontamentos">
          <AbaApontamentos ordem={ordem} />
        </TabsContent>

        <TabsContent value="itens">
          <AbaItens ordem={ordem} />
        </TabsContent>

        <TabsContent value="procedimentos">
          <Procedimentos />
        </TabsContent>
      </Tabs>

      {/* ModalEditarOrdem */}
      <ModalEditarOrdem
        ordem={ordem}
        open={editarAberto}
        onClose={() => setEditarAberto(false)}
      />
    </div>
  );
}
