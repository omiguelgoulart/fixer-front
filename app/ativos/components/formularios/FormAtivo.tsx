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
import { AtivoItf } from "@/app/utils/types/ativo/Ativo";
import { toast } from "sonner";
import { useAtivos } from "../../stores/useAtivos";

export default function FormularioAtivo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AtivoItf>();

  const [apiError, setApiError] = useState<string | null>(null);
  const {
    plantas,
    areas,
    sistemas,
    carregarPlantas,
    carregarAreasPorPlanta,
    carregarSistemasPorArea,
    cadastrarAtivo,
  } = useAtivos();

  const id_planta = watch("id_planta");
  const id_area = watch("id_area");

  useEffect(() => {
    carregarPlantas();
  }, [carregarPlantas]);

  useEffect(() => {
    if (id_planta) carregarAreasPorPlanta(id_planta);
  }, [id_planta, carregarAreasPorPlanta]);

  useEffect(() => {
    if (id_area) carregarSistemasPorArea(id_area);
  }, [id_area, carregarSistemasPorArea]);

  async function onSubmit(data: AtivoItf) {
    setApiError(null);
    const sucesso = await cadastrarAtivo(data);

    if (sucesso) {
      toast.success("Cadastro realizado com sucesso!", {
        description: "Seu ativo foi registrado no sistema.",
      });
      reset();
    } else {
      setApiError("Erro ao enviar os dados. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="nome">
              Nome do Ativo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Motor Elétrico 1"
              {...register("nome", {
                required: "O nome do ativo é obrigatório",
              })}
              className={errors.nome ? "border-red-500" : ""}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="fabricante">
              Fabricante <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fabricante"
              placeholder="Ex: WEG"
              {...register("fabricante", {
                required: "O fabricante é obrigatório",
              })}
              className={errors.fabricante ? "border-red-500" : ""}
            />
            {errors.fabricante && (
              <p className="text-sm text-red-500">
                {errors.fabricante.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="modelo">
              Modelo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="modelo"
              placeholder="Ex: M90"
              {...register("modelo", { required: "O modelo é obrigatório" })}
              className={errors.modelo ? "border-red-500" : ""}
            />
            {errors.modelo && (
              <p className="text-sm text-red-500">{errors.modelo.message}</p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="data_aquisicao">
              Data de Aquisição <span className="text-red-500">*</span>
            </Label>
            <Input
              id="data_aquisicao"
              type="date"
              {...register("data_aquisicao", {
                required: "A data de aquisição é obrigatória",
              })}
              className={errors.data_aquisicao ? "border-red-500" : ""}
              onChange={(e) => setValue("data_aquisicao", e.target.value)}
            />
            {errors.data_aquisicao && (
              <p className="text-sm text-red-500">
                {errors.data_aquisicao.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="localizacao_interna">Localização Interna</Label>
            <Input
              id="localizacao_interna"
              placeholder="Ex: Linha 1 - Ponto A"
              {...register("localizacao_interna")}
              className={errors.localizacao_interna ? "border-red-500" : ""}
            />
            {errors.localizacao_interna && (
              <p className="text-sm text-red-500">
                {errors.localizacao_interna.message}
              </p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="tipo_ativo">
              Tipo de Ativo <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("tipo_ativo", value as AtivoItf["tipo_ativo"])
              }
            >
              <SelectTrigger className={errors.tipo_ativo ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MECANICO">Mecânico</SelectItem>
                <SelectItem value="ELETRICO">Elétrico</SelectItem>
                <SelectItem value="ELETRONICO">Eletrônico</SelectItem>
                <SelectItem value="HIDRAULICO">Hidráulico</SelectItem>
                <SelectItem value="PNEUMATICO">Pneumático</SelectItem>
                <SelectItem value="OUTRO">Outro</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipo_ativo && (
              <p className="text-sm text-red-500">
                {errors.tipo_ativo.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="situacao">
              Situação <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("situacao", value as AtivoItf["situacao"])
              }
            >
              <SelectTrigger className={errors.situacao ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ATIVO">Ativo</SelectItem>
                <SelectItem value="INATIVO">Inativo</SelectItem>
                <SelectItem value="MANUTENCAO">Em Manutenção</SelectItem>
                <SelectItem value="DESCARTADO">Descartado</SelectItem>
              </SelectContent>
            </Select>
            {errors.situacao && (
              <p className="text-sm text-red-500">{errors.situacao.message}</p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="criticidade">
              Criticidade <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("criticidade", value as AtivoItf["criticidade"])
              }
            >
              <SelectTrigger className={errors.criticidade ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione a criticidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALTA">Alta</SelectItem>
                <SelectItem value="MEDIA">Média</SelectItem>
                <SelectItem value="BAIXA">Baixa</SelectItem>
              </SelectContent>
            </Select>
            {errors.criticidade && (
              <p className="text-sm text-red-500">
                {errors.criticidade.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="id_planta">
              Planta <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("id_planta", Number(value))}
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
            {errors.id_planta?.message && (
              <p className="text-sm text-red-500">{errors.id_planta.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="id_area">
              Área <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(v) => setValue("id_area", Number(v))}
              disabled={!id_planta}
            >
              <SelectTrigger>
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

          <div className="space-y-4">
            <Label htmlFor="id_sistema">
              Sistema <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(v) => setValue("id_sistema", Number(v))}
              disabled={!id_area}
            >
              <SelectTrigger className={errors.id_sistema ? "border-red-500" : ""}>
                <SelectValue placeholder="Selecione um sistema" />
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
              <p className="text-sm text-red-500">{errors.id_sistema.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="imagem">
            Imagem (URL) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="imagem"
            placeholder="https://exemplo.com/imagem.jpg"
            {...register("foto", {
              required: "A URL da imagem é obrigatória",
            })}
            className={errors.foto ? "border-red-500" : ""}
          />
          {errors.foto && (
            <p className="text-sm text-red-500">{errors.foto.message}</p>
          )}
        </div>

        {apiError && <p className="text-sm text-red-500">{apiError}</p>}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Limpar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Cadastrar Ativo"}
          </Button>
        </div>
      </div>
    </form>
  );
}
