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
import { AreaItf } from "@/app/utils/types/ativo/AreaItf";
import { useAtivos } from "../../stores/useAtivos";

export default function FormularioArea({
  valoresIniciais,
  onClose,
}: {
  valoresIniciais?: Partial<AreaItf>;
  onClose?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AreaItf>({
    defaultValues: valoresIniciais,
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const { plantas, carregarPlantas, cadastrarArea, editarArea } = useAtivos();

  useEffect(() => {
    carregarPlantas();
    if (valoresIniciais?.id_planta) {
      setValue("id_planta", valoresIniciais.id_planta);
    }
  }, [carregarPlantas, setValue, valoresIniciais]);

  const onSubmit = async (data: AreaItf) => {
    setApiError(null);
    const sucesso = valoresIniciais?.id
      ? await editarArea({ ...data, id: valoresIniciais.id })
      : await cadastrarArea(data);

    if (sucesso) {
      toast.success("Área salva com sucesso!");
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
            Nome da Área <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nome"
            defaultValue={valoresIniciais?.nome}
            placeholder="Ex: Área de Produção"
            {...register("nome", { required: "O nome da área é obrigatório" })}
            className={errors.nome ? "border-red-500" : ""}
          />
          {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="id_planta">
            Planta <span className="text-red-500">*</span>
          </Label>
          <Select
            onValueChange={(value) => setValue("id_planta", Number(value))}
            defaultValue={valoresIniciais?.id_planta?.toString() ?? ""}
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
          {errors.id_planta && (
            <p className="text-sm text-red-500">{errors.id_planta.message}</p>
          )}
        </div>
      </div>

      {apiError && <p className="text-sm text-red-500">{apiError}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Área"}
        </Button>
      </div>
    </form>
  );
}
