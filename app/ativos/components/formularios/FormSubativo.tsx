"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
import { SubAtivoItf } from "@/app/utils/types/ativo/SubAtivoItf";
import { toast } from "sonner";
import { useAtivos } from "../../stores/useAtivos";

export default function FormularioSubativo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SubAtivoItf>();

  const {
    plantas,
    areas,
    sistemas,
    ativos,
    carregarPlantas,
    carregarAreasPorPlanta,
    carregarSistemasPorArea,
    carregarAtivosPorSistema,
    cadastrarSubativo,
    error,
    limparErro,
  } = useAtivos();

  const id_planta = watch("id_planta");
  const id_area = watch("id_area");
  const id_sistema = watch("id_sistema");

  useEffect(() => {
    carregarPlantas();
  }, [carregarPlantas]);

  useEffect(() => {
    if (id_planta) carregarAreasPorPlanta(id_planta);
  }, [id_planta, carregarAreasPorPlanta]);

  useEffect(() => {
    if (id_area) carregarSistemasPorArea(id_area);
  }, [id_area, carregarSistemasPorArea]);

  useEffect(() => {
    if (id_sistema) carregarAtivosPorSistema(id_sistema);
  }, [id_sistema, carregarAtivosPorSistema]);

  async function onSubmit(data: SubAtivoItf) {
    limparErro();
    const sucesso = await cadastrarSubativo(data);
    if (sucesso) {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Seu subativo foi registrado no sistema.",
      });
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome do Subativo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Bobina de Cobre"
              {...register("nome", {
                required: "O nome do subativo é obrigatório",
              })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_ativo">
              Tipo de SubAtivo <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("tipo", value)}
              defaultValue=""
            >
              <SelectTrigger className={errors.tipo ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ELETRICO">Elétrico</SelectItem>
                <SelectItem value="MECANICO">Mecânico</SelectItem>
                <SelectItem value="HIDRAULICO">Hidráulico</SelectItem>
                <SelectItem value="PNEUMATICO">Pneumático</SelectItem>
                <SelectItem value="OUTRO">Outro</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipo && (
              <p className="text-sm text-red-500">{errors.tipo.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="id_planta">
              Planta <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("id_planta", Number(value))}
              defaultValue=""
            >
              <SelectTrigger
                className={errors.id_planta ? "border-red-500" : ""}
              >
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

          <div className="space-y-2">
            <Label htmlFor="id_sistema">
              Sistema <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("id_sistema", Number(value))}
              defaultValue=""
            >
              <SelectTrigger
                className={errors.id_sistema ? "border-red-500" : ""}
              >
                <SelectValue
                  placeholder={
                    sistemas.length === 0
                      ? "Selecione uma área primeiro"
                      : "Selecione um sistema"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {sistemas.map((sistema) => (
                  <SelectItem key={sistema.id} value={sistema.id.toString()}>
                    {sistema.nome} ({sistema.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_sistema && (
              <p className="text-sm text-red-500">
                {errors.id_sistema.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_ativo">
              Ativo <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(v) => setValue("id_ativo", Number(v))}
              disabled={!id_sistema}
            >
              <SelectTrigger
                className={errors.id_ativo ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Selecione um ativo" />
              </SelectTrigger>
              <SelectContent>
                {ativos.map((ativo) => (
                  <SelectItem key={ativo.id} value={ativo.id.toString()}>
                    {ativo.nome} ({ativo.codigo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_ativo && (
              <p className="text-sm text-red-500">{errors.id_ativo.message}</p>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar SubAtivo"}
          </Button>
        </div>
      </div>
    </form>
  );
}
