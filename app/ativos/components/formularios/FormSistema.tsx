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

export default function FormularioSistema({
  valoresIniciais,
  onClose,
}: {
  valoresIniciais?: Partial<SistemaItf>;
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SistemaItf>({
    defaultValues: valoresIniciais,
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const { areas, carregarAreas, cadastrarSistema, editarSistema } = useAtivos();

  useEffect(() => {
    carregarAreas();
    if (valoresIniciais?.id_area) {
      setValue("id_area", valoresIniciais.id_area);
    }
  }, [carregarAreas, setValue, valoresIniciais]);

  const onSubmit = async (data: SistemaItf) => {
    setApiError(null);
    const sucesso = valoresIniciais?.id
      ? await editarSistema({ ...data, id: valoresIniciais.id })
      : await cadastrarSistema(data);

    if (sucesso) {
      toast.success("Sistema salvo com sucesso!");
      console.log("Dados enviados:", data);
      reset();
      onClose?.();
    } else {
      setApiError("Erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">
            Nome do Sistema <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nome"
            defaultValue={valoresIniciais?.nome}
            placeholder="Ex: Sistema Elétrico"
            {...register("nome", { required: "O nome do sistema é obrigatório" })}
            className={errors.nome ? "border-red-500" : ""}
          />
          {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="id_area">
            Área <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue("id_area", Number(value))}
            defaultValue={valoresIniciais?.id_area?.toString() ?? ""}
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

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Sistema"}
        </Button>
      </div>
    </form>
  );
}
