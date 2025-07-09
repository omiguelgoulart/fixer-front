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
import { useAtivos } from "../stores/useAtivos";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface ModalEditarAtivoProps {
  aberto: boolean;
  aoFechar: () => void;
  aoAtualizar: () => Promise<void>;
  ativo: AtivoItf;
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
    watch,
    formState: { isSubmitting },
  } = useForm<AtivoItf>();

  const {
    plantas,
    areas,
    sistemas,
    carregarPlantas,
    carregarAreasPorPlanta,
    carregarSistemasPorArea,
    editarAtivo,
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

  useEffect(() => {
    for (const [chave, valor] of Object.entries(ativo)) {
      if (chave === "data_aquisicao" && typeof valor === "string") {
        const dataFormatada = valor.split("T")[0];
        setValue(chave, dataFormatada);
      } else {
        // @ts-expect-error atribuição dinâmica permitida
        setValue(chave, valor);
      }
    }
  }, [ativo, setValue]);

  async function onSubmit(data: AtivoItf) {
    const response = await editarAtivo(data);
    if (response !== null && response !== undefined) {
      toast.success("Ativo atualizado com sucesso!");
      aoAtualizar();
      aoFechar();
    } else {
      toast.error("Erro ao atualizar o ativo. Tente novamente.");
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="fabricante">Fabricante</Label>
              <Input id="fabricante" {...register("fabricante", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" {...register("modelo", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_aquisicao">Data de Aquisição</Label>
              <Input type="date" id="data_aquisicao" {...register("data_aquisicao", { required: true })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="localizacao_interna">Localização Interna</Label>
              <Input id="localizacao_interna" {...register("localizacao_interna")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_ativo">Tipo de Ativo</Label>
              <Select
                onValueChange={(value) =>
                  setValue("tipo_ativo", value as AtivoItf["tipo_ativo"])
                }
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="situacao">Situação</Label>
              <Select
                onValueChange={(value) =>
                  setValue("situacao", value as AtivoItf["situacao"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                  <SelectItem value="MANUTENCAO">Em Manutenção</SelectItem>
                  <SelectItem value="DESCARTADO">Descartado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="criticidade">Criticidade</Label>
              <Select
                onValueChange={(value) =>
                  setValue("criticidade", value as AtivoItf["criticidade"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a criticidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="id_planta">Planta</Label>
              <Select
                onValueChange={(value) => setValue("id_planta", Number(value))}
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="id_area">Área</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="id_sistema">Sistema</Label>
              <Select
                onValueChange={(v) => setValue("id_sistema", Number(v))}
                disabled={!id_area}
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">Imagem (URL)</Label>
              <Input id="foto" {...register("foto")} />
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
