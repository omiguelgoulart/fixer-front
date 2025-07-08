"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { SistemaItf } from "@/app/utils/types/ativo/SistemaItf";
import { useAtivos } from "../../stores/useAtivos";

export default function FormularioSistema() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SistemaItf>();

  const [apiError, setApiError] = useState<string | null>(null);
  const { areas, carregarAreas, cadastrarSistema } = useAtivos();

  useEffect(() => {
    carregarAreas();
  }, [carregarAreas]);

  const onSubmit = async (data: SistemaItf) => {
    setApiError(null);
    const sucesso = await cadastrarSistema(data);

    if (sucesso) {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Seu sistema foi registrado no sistema.",
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
              Nome do Sistema <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Sistema Elétrico"
              {...register("nome", {
                required: "O nome do sistema é obrigatório",
              })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_area">
              Área <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("id_area", Number(value))}
              defaultValue=""
            >
              <SelectTrigger className={errors.id_area ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione uma área" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.nome} ({area.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_area && (
              <p className="text-sm text-red-500">{errors.id_area.message}</p>
            )}
          </div>
        </div>
      </div>

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar Sistema"}
        </Button>
      </div>
    </form>
  );
}
