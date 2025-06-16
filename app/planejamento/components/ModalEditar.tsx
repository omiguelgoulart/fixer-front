"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  OrdemServicoItf,
  PrioridadeOrdem,
  StatusOrdem,
  TipoManutencao,
} from "@/app/utils/types/planejamento/OSItf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ModalEditarOrdemProps {
  ordem: OrdemServicoItf | null;
  open: boolean;
  onClose: () => void;
}

type OrdemServicoForm = {
  titulo: string;
  status: StatusOrdem;
  prioridade: PrioridadeOrdem;
  tipoManutencao: TipoManutencao;
  dataInicioPlanejada: string;
  dataVencimento: string;
};

export default function ModalEditarOrdem({
  ordem,
  open,
  onClose,
}: ModalEditarOrdemProps) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<OrdemServicoForm>({
      defaultValues: {
        titulo: "",
        status: "EM_ABERTO",
        prioridade: "MEDIA",
        tipoManutencao: "PREVENTIVA",
        dataInicioPlanejada: "",
        dataVencimento: "",
      },
    });

  // Quando abrir o modal com uma ordem, preenche o form
  useEffect(() => {
    if (ordem) {
      reset({
        titulo: ordem.titulo,
        status: ordem.status,
        prioridade: ordem.prioridade,
        tipoManutencao: ordem.tipoManutencao,
        dataInicioPlanejada: ordem.dataInicioPlanejada.slice(0, 16),
        dataVencimento: ordem.dataVencimento.slice(0, 16),
      });
    }
  }, [ordem, reset]);

  async function onSubmit(data: OrdemServicoForm) {
    if (!ordem) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            dataInicioPlanejada: new Date(
              data.dataInicioPlanejada
            ).toISOString(),
            dataVencimento: new Date(data.dataVencimento).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar a ordem de serviço");
      }

      toast.success("Ordem de serviço atualizada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar OS:", error);
      toast.error("Erro ao atualizar a ordem de serviço.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Ordem de Serviço</DialogTitle>
        </DialogHeader>

        {ordem ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input {...register("titulo")} />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v as StatusOrdem)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EM_ABERTO">Em Aberto</SelectItem>
                  <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Prioridade */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Prioridade
              </label>
              <Select
                value={watch("prioridade")}
                onValueChange={(v) =>
                  setValue("prioridade", v as PrioridadeOrdem)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de manutenção */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Manutenção
              </label>
              <Select
                value={watch("tipoManutencao")}
                onValueChange={(v) =>
                  setValue("tipoManutencao", v as TipoManutencao)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
                  <SelectItem value="CORRETIVA">Corretiva</SelectItem>
                  <SelectItem value="PREDITIVA">Preditiva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data Início Planejada */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Data Início Planejada
              </label>
              <Input
                type="datetime-local"
                {...register("dataInicioPlanejada")}
              />
            </div>

            {/* Data de Vencimento */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Data de Vencimento
              </label>
              <Input type="datetime-local" {...register("dataVencimento")} />
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit">Salvar alterações</Button>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Nenhuma OS selecionada
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
