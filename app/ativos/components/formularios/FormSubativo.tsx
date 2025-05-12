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
import { PlantaItf } from "@/app/utils/types/PlantaItf";
import { AreaItf } from "@/app/utils/types/AreaItf";
import { SistemaItf } from "@/app/utils/types/SistemaItf";
import { AtivoItf } from "@/app/utils/types/AtivoITF";
import { SubAtivoItf } from "@/app/utils/types/SubAtivoItf";
import { toast } from "sonner";

export default function FormularioSubativo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<SubAtivoItf>();
  const [plantas, setPlantas] = useState<PlantaItf[]>([]);
  const [areas, setAreas] = useState<AreaItf[]>([]);
  const [sistemas, setSistemas] = useState<SistemaItf[]>([]);
  const [ativos, setAtivos] = useState<AtivoItf[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const id_planta = watch("id_planta");
  const id_area = watch("id_area");
  const id_sistema = watch("id_sistema");

  // Carrega todas as plantas
  useEffect(() => {
    async function carregarPlantas() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/planta`
        );
        if (!response.ok) throw new Error("Erro ao carregar plantas");
        const data = await response.json();
        setPlantas(data);
      } catch (error) {
        console.error("Erro ao carregar plantas:", error);
        setApiError("Erro ao carregar as plantas. Tente novamente mais tarde.");
      }
    }

    carregarPlantas();
  }, []);

  // Ao selecionar a planta, carrega suas áreas
  useEffect(() => {
    if (!id_planta) return;

    fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta/${id_planta}`)
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.area || []);
        setSistemas([]); // Limpa os sistemas enquanto a área não for selecionada
      })
      .catch((err) => {
        console.error("Erro ao carregar áreas da planta", err);
        setApiError("Erro ao carregar dados da planta.");
      });
  }, [id_planta]);

  // Ao selecionar a área, carrega os sistemas dela
  useEffect(() => {
    if (!id_area) return;

    fetch(`${process.env.NEXT_PUBLIC_URL_API}/area/${id_area}/sistemas`)
      .then((res) => res.json())
      .then((data) => {
        setSistemas(data.sistema || []);
      })
      .catch((err) => {
        console.error("Erro ao carregar sistemas da área", err);
        setApiError("Erro ao carregar sistemas da área.");
      });
  }, [id_area]);

  // Ao selecionar o sistema, carrega os ativos dele
  useEffect(() => {
    if (!id_sistema) return;
  
    fetch(`${process.env.NEXT_PUBLIC_URL_API}/sistema/${id_sistema}/ativos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ATIVOS CARREGADOS:", data);
        setAtivos(data); // aqui `data` deve ser a lista de ativos
      })
      .catch((err) => {
        console.error("Erro ao carregar ativos do sistema", err);
        setApiError("Erro ao carregar ativos do sistema.");
      });
  }, [id_sistema]);
  

  async function onSubmit(data: SubAtivoItf) {
    try {
      setApiError(null); // Limpa erro anterior
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/subativo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao enviar formulário");
      }

      toast.success("Cadastro realizado com sucesso!", {
        description: "Seu subativo foi registrado no sistema.",
      });
      reset(); // Limpa o formulário
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao enviar os dados.";
      setApiError(`Erro ao enviar os dados: ${errorMessage}`);
      console.error("Erro ao enviar formulário:", error);
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
        
        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
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
