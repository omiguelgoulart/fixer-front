"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlantaItf } from "@/app/utils/types/ativo/PlantaItf";
import { toast } from "sonner";
import { useState } from "react";
import { useAtivos } from "../../stores/useAtivos";

export default function FormularioPlanta() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PlantaItf>();
  const [apiError, setApiError] = useState<string | null>(null);
  const { cadastrarPlanta } = useAtivos();

  const onSubmit = async (data: PlantaItf) => {
    setApiError(null);
    const sucesso = await cadastrarPlanta(data);

    if (sucesso) {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Sua planta foi registrada no sistema.",
      });
      reset();
    } else {
      setApiError("Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome da Planta <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Planta Industrial Norte"
              {...register("nome", {
                required: "O nome da planta é obrigatório",
              })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="localizacao">
            Localização <span className="text-red-500">*</span>
          </Label>
          <Input
            id="localizacao"
            placeholder="Ex: Cuiabá - MT"
            {...register("localizacao", {
              required: "A localização é obrigatória",
            })}
            className={errors.localizacao ? "border-red-500" : ""}
          />
          {errors.localizacao && (
            <p className="text-sm text-red-500">
              {errors.localizacao.message}
            </p>
          )}
        </div>
      </div>

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar Planta"}
        </Button>
      </div>
    </form>
  );
}
