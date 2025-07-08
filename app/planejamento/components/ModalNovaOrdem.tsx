"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { usePlanejamento } from "../stores/usePlanejamento";

interface ModalNovaOrdemProps {
  open: boolean;
  onClose: () => void;
  dataSelecionada: string | null;
}

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

export default function ModalNovaOrdem({
  open,
  onClose,
  dataSelecionada,
}: ModalNovaOrdemProps) {
  const {
    usuarios,
    plantas,
    areas,
    sistemas,
    ativos,
    fetchUsuarios,
    fetchPlantas,
    fetchAreas,
    fetchSistemas,
    fetchAtivos,
    fetchOrdens,
  } = usePlanejamento();

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

useEffect(() => {
  fetchUsuarios();
  fetchPlantas();
}, [fetchUsuarios, fetchPlantas]);

useEffect(() => {
  if (id_planta) fetchAreas(id_planta);
}, [id_planta, fetchAreas]);

useEffect(() => {
  if (id_area) fetchSistemas(id_area);
}, [id_area, fetchSistemas]);

useEffect(() => {
  if (id_sistema) fetchAtivos(id_sistema);
}, [id_sistema, fetchAtivos]);

  useEffect(() => {
    if (dataSelecionada) {
      setValue("dataInicioPlanejada", dataSelecionada.split("T")[0]);
    }
  }, [dataSelecionada, setValue]);

  async function onSubmit(data: FormData) {
    try {
      const usuarioId = Number(localStorage.getItem("usuarioId") || "1");

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: data.titulo,
          status: data.status,
          prioridade: data.prioridade,
          tipoManutencao: data.tipoManutencao,
          responsavelId: Number(data.responsavelId),
          usuarioId,
          ativoId: data.ativoId,
          dataVencimento: data.dataVencimento,
          dataInicioPlanejada: data.dataInicioPlanejada,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar OS");
      }

      toast.success("Ordem de Serviço cadastrada com sucesso!");
      await fetchOrdens(); // atualiza estado global
      reset();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar OS:", error);
      toast.error((error as Error).message || "Erro ao cadastrar Ordem de Serviço");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nova Ordem de Serviço</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova OS.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Título *</Label>
              <Input {...register("titulo")} />
            </div>

            <div>
              <Label>Status *</Label>
              <Select
                value={watch("status")}
                onValueChange={(v) => setValue("status", v)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="EM_ABERTO">Em Aberto</SelectItem>
                  <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Prioridade *</Label>
              <Select
                value={watch("prioridade")}
                onValueChange={(v) => setValue("prioridade", v)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de Manutenção *</Label>
              <Select
                value={watch("tipoManutencao")}
                onValueChange={(v) => setValue("tipoManutencao", v)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORRETIVA">Corretiva</SelectItem>
                  <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
                  <SelectItem value="PREDITIVA">Preditiva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Responsável *</Label>
              <Select
                value={watch("responsavelId")}
                onValueChange={(v) => setValue("responsavelId", v)}
              >
                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>
                  {usuarios.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>{u.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Planta *</Label>
              <Select
                value={watch("id_planta")?.toString() || ""}
                onValueChange={(v) => setValue("id_planta", Number(v))}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {plantas.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.nome} ({p.codigo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Área *</Label>
              <Select
                value={watch("id_area")?.toString() || ""}
                onValueChange={(v) => setValue("id_area", Number(v))}
                disabled={!id_planta}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {areas.map((a) => (
                    <SelectItem key={a.id} value={a.id.toString()}>{a.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Sistema *</Label>
              <Select
                value={watch("id_sistema")?.toString() || ""}
                onValueChange={(v) => setValue("id_sistema", Number(v))}
                disabled={!id_area}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {sistemas.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>{s.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ativo *</Label>
              <Select
                value={watch("ativoId")?.toString() || ""}
                onValueChange={(v) => setValue("ativoId", Number(v))}
                disabled={!id_sistema}
              >
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {ativos.map((a) => (
                    <SelectItem key={a.id} value={a.id.toString()}>{a.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data Início *</Label>
              <Input type="date" {...register("dataInicioPlanejada")} />
            </div>

            <div>
              <Label>Data Vencimento *</Label>
              <Input type="date" {...register("dataVencimento")} />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit">Cadastrar OS</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
