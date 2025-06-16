"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AtivoItf } from "@/app/utils/types/ativo/Ativo";

interface ModalEditarAtivoProps {
  aberto: boolean;
  aoFechar: () => void;
  ativo: AtivoItf;
  aoAtualizar?: () => void;
}

export default function ModalEditarAtivo({
  aberto,
  aoFechar,
  ativo,
  aoAtualizar,
}: ModalEditarAtivoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AtivoItf>();

  useEffect(() => {
    if (ativo) {
      for (const [chave, valor] of Object.entries(ativo)) {
        // @ts-expect-error: Dynamic key assignment is not type-safe
        setValue(chave, valor);
      }
    }
  }, [ativo, setValue]);

  async function onSubmit(data: AtivoItf) {
    console.log("Dados enviados:", data);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativo.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Erro ao atualizar ativo");

      toast.success("Ativo atualizado com sucesso");
      aoFechar();
      if (aoAtualizar) aoAtualizar();
    } catch (error) {
      console.error("Erro ao atualizar ativo:", error);
      toast.error("Erro ao atualizar o ativo");
    }
  }

  return (
    <Dialog open={aberto} onOpenChange={aoFechar}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">
            Editar Ativo
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" {...register("nome", { required: true })} />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="fabricante">Fabricante</Label>
              <Input
                id="fabricante"
                {...register("fabricante", { required: true })}
              />
              {errors.fabricante && (
                <p className="text-sm text-red-500">
                  {errors.fabricante.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" {...register("modelo", { required: true })} />
              {errors.modelo && (
                <p className="text-sm text-red-500">{errors.modelo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="data_aquisicao">Data de Aquisição</Label>
              <Input
                type="date"
                id="data_aquisicao"
                {...register("data_aquisicao", { required: true })}
              />
              {errors.data_aquisicao && (
                <p className="text-sm text-red-500">
                  {errors.data_aquisicao.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="localizacao_interna">Localização Interna</Label>
              <Input
                id="localizacao_interna"
                {...register("localizacao_interna")}
              />
              {errors.localizacao_interna && (
                <p className="text-sm text-red-500">
                  {errors.localizacao_interna.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo_ativo">Tipo de Ativo</Label>
              <Input
                id="tipo_ativo"
                {...register("tipo_ativo", { required: true })}
              />
              {errors.tipo_ativo && (
                <p className="text-sm text-red-500">
                  {errors.tipo_ativo.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor="imagem">Imagem (URL)</Label>
              <Input
                id="imagem"
                placeholder="https://exemplo.com/imagem.jpg"
                {...register("foto")}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={aoFechar}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
