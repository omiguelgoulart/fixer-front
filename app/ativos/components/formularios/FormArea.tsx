"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AreaItf } from "@/app/utils/types/AreaItf";
import { PlantaItf } from "@/app/utils/types/PlantaItf";

export default function FormularioArea() {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting }, reset } = useForm<AreaItf>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [plantas, setPlantas] = useState<PlantaItf[]>([]);

  useEffect(() => {
    const carregarPlantas = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`);
        const data = await response.json();
        setPlantas(data);
      } catch (error) {
        console.error("Erro ao carregar plantas:", error);
      }
    };

    carregarPlantas();
  }, []);

  const onSubmit = async (data: AreaItf) => {
    try {
      setApiError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/area`, {
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
        description: "Sua área foi registrada no sistema.",
      });

      reset();
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
            <Label htmlFor="nome" className="text-center">
              Nome da Área <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Área de Produção"
              {...register("nome", { required: "O nome da área é obrigatório" })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="id_planta" className="text-center">
            Planta <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue("id_planta", Number(value))}
            defaultValue=""
          >
            <SelectTrigger className={errors.id_planta ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione uma planta" />
            </SelectTrigger>
            <SelectContent>
              {plantas.map((planta) => (
                <SelectItem key={planta.id} value={planta.id.toString()}>
                  {planta.nome} ({planta.codigo})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.id_planta && <p className="text-sm text-red-500">{errors.id_planta.message}</p>}
        </div>
      </div>

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar Área"}
        </Button>
      </div>
    </form>
  );
}
