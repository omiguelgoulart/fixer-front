"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {  AlertDialog,  AlertDialogTrigger,  AlertDialogContent,  AlertDialogHeader,  AlertDialogTitle,  AlertDialogFooter,  AlertDialogCancel,  AlertDialogAction, AlertDialogDescription, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import OrdemTabs from "@/app/tecnico/components/OrdemTabs";
import ModalEditarOrdem from "./ModalEditar";
import { Pencil, Printer, Trash } from "lucide-react";
import OrdemInfo from "@/app/tecnico/components/OrdemInfo";
import { Badge } from "@/components/ui/badge";

interface Props {
  ordem: OrdemServicoItf | null;
}

export default function DetalhesOrdem({ ordem }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editarAberto, setEditarAberto] = useState(false);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<number[]>([]);
  const [novoApontamento, setNovoApontamento] = useState<string>("");

  function toggleTarefa(id: number) {
    setTarefasConcluidas((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  }

  if (!ordem) {
    return (
      <div className="p-8 text-center text-gray-500">
        Selecione uma ordem para visualizar os detalhes
      </div>
    );
  }

  async function handleExcluir() {
    if (!ordem) return;
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${ordem.id}`, {
        method: "DELETE",
      });
      toast.success("Ordem excluída!");
      router.push("/planejamento");
    } catch {
      toast.error("Erro ao excluir.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAlterarStatus(status: "EM_ABERTO" | "CONCLUIDA") {
    if (!ordem) return;
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${ordem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success(`Status alterado para ${status === "EM_ABERTO" ? "Em Aberto" : "Concluída"}`);
    } catch {
      toast.error("Erro ao alterar status.");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 border-b flex justify-between items-center flex-wrap gap-2 md:flex-nowrap">
<div>
  <div className="flex items-center gap-2">
    <span className="text-gray-500 text-sm">{ordem.codigo}</span>
    <h2 className="font-medium text-gray-900">{ordem.titulo}</h2>
  </div>
  <div className="mt-1">
        <Badge className="bg-blue-50 text-blue-700 border border-blue-100">
          {ordem.tipoManutencao.charAt(0) +
            ordem.tipoManutencao.slice(1).toLowerCase()}
        </Badge>
  </div>
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
      
      <OrdemInfo ordem={ordem} />

      <div className="p-4 max-w-4xl mx-auto">
        <OrdemTabs
          ordem={ordem}
          tarefasConcluidas={tarefasConcluidas}
          toggleTarefa={toggleTarefa}
          novoApontamento={novoApontamento}
          setNovoApontamento={setNovoApontamento}
          onUpdateOrdem={() => router.refresh()}
        />
      </div>

      <ModalEditarOrdem ordem={ordem} open={editarAberto} onClose={() => setEditarAberto(false)} />
    </div>
  );
}
