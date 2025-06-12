"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {  Dialog,  DialogTrigger,  DialogContent,  DialogHeader,  DialogTitle,  DialogDescription,  DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue } from "@/components/ui/select";
import { ReactNode,  useState } from "react";
import { PlantaItf } from "@/app/utils/types/ativo/PlantaItf";
import { AreaItf } from "@/app/utils/types/ativo/AreaItf";
import { SistemaItf } from "@/app/utils/types/ativo/SistemaItf";
import { AtivoItf } from "@/app/utils/types/ativo/AtivoITF";
import { UsuarioItf } from "@/app/utils/types/usuarioItf";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ModalNovaOrdemProps = {
  children: ReactNode;
  onSuccess?: () => void; // 👈 ADICIONA ISSO
};


type FormData = {
  titulo: string;
  status: string;
  prioridade: string;
  tipoManutencao: string;
  responsavelId: string;
  id_planta: number;
  id_area: number;
  id_sistema: number;
  ativoId: number;
  dataInicioPlanejada: string;
  dataVencimento: string;
};

export function ModalNovaOrdem({ children }: ModalNovaOrdemProps) {
  const [open, setOpen] = useState(false);
  const [plantas, setPlantas] = useState<PlantaItf[]>([]);
  const [areas, setAreas] = useState<AreaItf[]>([]);
  const [sistemas, setSistemas] = useState<SistemaItf[]>([]);
  const [ativos, setAtivos] = useState<AtivoItf[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioItf[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      titulo: "",
      status: "EM_ABERTO",
      prioridade: "MEDIA",
      tipoManutencao: "CORRETIVA",
      responsavelId: "",
      ativoId: 0,
      dataInicioPlanejada: "",
      dataVencimento: "",
    },
  });

  const id_planta = watch("id_planta");
  const id_area = watch("id_area");
  const id_sistema = watch("id_sistema");

  // Carrega os usuários
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/usuario`
        );
        const data = await response.json();
        setUsuarios(data)
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        setApiError(
          "Erro ao carregar os usuários. Tente novamente mais tarde."
        );
      }
    }
    carregarUsuarios();
  }, []);

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

  //função post das ordens de serviço
  async function onSubmit(data: FormData) {
    console.log("Dados do formulário:", data);
    try {
      const usuarioId = Number(localStorage.getItem("usuarioId") || "1"); // exemplo

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ordemservico`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            titulo: data.titulo,
            status: data.status,
            prioridade: data.prioridade,
            tipoManutencao: data.tipoManutencao,
            responsavelId: Number(data.responsavelId),
            usuarioId: usuarioId,
            ativoId: data.ativoId,
            dataVencimento: data.dataVencimento,
            dataInicioPlanejada: data.dataInicioPlanejada, // caso sua API aceite
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar OS");
      }
      toast.success("Ordem de Serviço cadastrada com sucesso!");
      console.log("Ordem de Serviço cadastrada com sucesso!");
      router.refresh(); // força reload da página atual
      // Limpa os campos do formulário
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar OS:", error);
      toast.error((error as Error).message || "Erro ao cadastrar Ordem de Serviço");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        {/*titulos*/}
        <DialogHeader>
          <DialogTitle>Cadastro de Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar uma nova OS.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* tipo de titulo */}
            <div>
              <Label>Título *</Label>
              <Input
                {...register("titulo")}
                placeholder="Ex: Troca de Filtro"
              />
            </div>
            {/* tipo de status */}
            <div>
              <Label>Status *</Label>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EM_ABERTO">Em Aberto</SelectItem>
                  <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* tipo de prioeidade */}
            <div>
              <Label>Prioridade *</Label>
              <Select
                value={watch("prioridade")}
                onValueChange={(v) => setValue("prioridade", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* tipo de manutenção */}
            <div>
              <Label>Tipo de Manutenção *</Label>
              <Select
                value={watch("tipoManutencao")}
                onValueChange={(v) => setValue("tipoManutencao", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORRETIVA">Corretiva</SelectItem>
                  <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
                  <SelectItem value="PREDITIVA">Preditiva</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Responsável */}
            <div>
              <Label>Técnico responsável *</Label>
              <Select
                value={watch("responsavelId")}
                onValueChange={(v) => setValue("responsavelId", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o responsável pela execução" />
                </SelectTrigger>
                <SelectContent>
                  {usuarios.map((usuario) => (
                    <SelectItem key={usuario.id} value={String(usuario.id)}>
                      {usuario.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Planta */}
            <div>
              <Label>Planta *</Label>
              <Select
                value={watch("id_planta")?.toString() || ""}
                onValueChange={(v) => setValue("id_planta", Number(v))}
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

            {/* Área */}
            <div>
              <Label>Área *</Label>
              <Select
                value={watch("id_area")?.toString() || ""}
                onValueChange={(v) => setValue("id_area", Number(v))}
                disabled={!watch("id_planta")}
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

            {/* Sistema */}
            <div>
              <Label>Sistema *</Label>
              <Select
                value={watch("id_sistema")?.toString() || ""}
                onValueChange={(v) => setValue("id_sistema", Number(v))}
                disabled={!watch("id_area")}
              >
                <SelectTrigger>
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
            </div>

            {/* Ativo */}
            <div>
              <Label>Ativo *</Label>
              <Select
                value={watch("ativoId")?.toString() || ""}
                onValueChange={(v) => setValue("ativoId", Number(v))}
                disabled={!watch("id_sistema")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ativo" />
                </SelectTrigger>
                <SelectContent>
                  {ativos.map((ativo) => (
                    <SelectItem key={ativo.id} value={ativo.id.toString()}>
                      {ativo.nome} - {ativo.codigo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* tipo de Data Inicio */}
            <div>
              <Label>Data Início Planejada *</Label>
              <Input type="date" {...register("dataInicioPlanejada")} />
            </div>
            {/* tipo de Data Vencimento */}
            <div>
              <Label>Data de Vencimento *</Label>
              <Input type="date" {...register("dataVencimento")} />
            </div>
          </div>
          {apiError && <p className="text-sm text-red-500">{apiError}</p>}
          {/*Botões de ação*/}
          <DialogFooter className="mt-4 flex justify-between">
           <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setAreas([]);
                setSistemas([]);
                setAtivos([]);
                }}
              >
                Limpar
            </Button>
            <Button type="submit">Cadastrar OS</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
