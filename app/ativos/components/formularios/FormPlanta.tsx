"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlantaItf } from "@/app/utils/types/PlantaItf";
import { useState } from "react";
import { toast } from "sonner"

export default function FormularioPlanta() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PlantaItf>();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: PlantaItf) => {
    try {
      setApiError(null); // Limpa erro anterior
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar formulário");
      }

      toast.success("Cadastro realizado com sucesso!", {
        description: "Sua planta foi registrada no sistema.",
      });      
      reset(); // Limpa o formulário
    } catch (error) {
      setApiError("Erro ao enviar os dados. Tente novamente.");
      console.error(error);
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
              {...register("nome", { required: "O nome da planta é obrigatório" })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="localizacao">
            Localização <span className="text-red-500">*</span>
          </Label>
          <Input
            id="localizacao"
            placeholder="Ex: Cuiabá - MT"
            {...register("localizacao", { required: "A localização é obrigatória" })}
            className={errors.localizacao ? "border-red-500" : ""}
          />
          {errors.localizacao && (
            <p className="text-sm text-red-500">{errors.localizacao.message}</p>
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
