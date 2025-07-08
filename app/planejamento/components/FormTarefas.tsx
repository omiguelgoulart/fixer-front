"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { usePlanejamento } from "../stores/usePlanejamento";

interface Props {
  ordemServicoId: number;
  onSuccess?: () => void;
}

interface FormData {
  descricao: string;
}

export default function FormTarefas({ ordemServicoId, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { criarTarefa } = usePlanejamento();

  async function onSubmit(data: FormData) {
    try {
      await criarTarefa({
        descricao: data.descricao,
        ordemServicoId,
      });

      toast.success("Tarefa adicionada com sucesso!");
      reset();
      onSuccess?.();
    } catch (err: unknown) {
      console.error("Erro ao adicionar tarefa:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro genérico ao adicionar tarefa";
      toast.error(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição da tarefa
        </label>
        <Textarea
          {...register("descricao", { required: "Descrição é obrigatória" })}
          rows={3}
        />
        {errors.descricao && (
          <p className="text-xs text-red-600 mt-1">{errors.descricao.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          disabled={isSubmitting}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Adicionar Tarefa"}
        </Button>
      </div>
    </form>
  );
}
