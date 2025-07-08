"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { useUsuario } from "@/app/contexts/UsuarioContex";
import { useTecnico } from "../../stores/useTecnico";
import { Trash } from "lucide-react";

interface Props {
  ordem: OrdemServicoItf;
  onUpdate?: (novaOrdem: OrdemServicoItf) => void;
}

type FormInputs = {
  texto: string;
};

export default function AbaApontamentos({ ordem, onUpdate }: Props) {
  const { usuario } = useUsuario();
  const { adicionarObservacao, removerObservacao, buscarOrdemPorId } =
    useTecnico();
  const [ordemAtualizada, setOrdemAtualizada] =
    useState<OrdemServicoItf | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormInputs>();

  const obs = ordemAtualizada?.observacoes || ordem.observacoes || [];

  useEffect(() => {
    const fetch = async () => {
      const atualizada = await buscarOrdemPorId(ordem.id);
      if (atualizada) setOrdemAtualizada(atualizada);
    };
    fetch();
  }, [ordem.id, buscarOrdemPorId]);

  const onSubmit = async (data: FormInputs) => {
    if (!usuario) {
      toast.error("Usuário não identificado");
      return;
    }

    try {
      const response = await adicionarObservacao(
        ordem.id,
        data.texto,
        usuario.id
      );
      if (response !== null) {
        toast.success("Apontamento salvo com sucesso!");
        reset();
        const atualizada = await buscarOrdemPorId(ordem.id);
        if (atualizada) {
          setOrdemAtualizada(atualizada);
          if (onUpdate) onUpdate(atualizada);
        }
      } else {
        toast.error("Erro ao salvar apontamento");
      }
    } catch (error) {
      console.error("Erro ao salvar apontamento:", error);
      toast.error("Erro ao salvar apontamento");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este apontamento?")) return;
    try {
      const success = await removerObservacao(ordem.id, id);
      if (success !== null) {
        toast.success("Apontamento removido com sucesso!");
        const atualizada = await buscarOrdemPorId(ordem.id);
        if (atualizada) {
          setOrdemAtualizada(atualizada);
          if (onUpdate) onUpdate(atualizada);
        }
      } else {
        toast.error("Erro ao remover apontamento");
      }
    } catch (error) {
      console.error("Erro ao remover apontamento:", error);
      toast.error("Erro ao remover apontamento");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Apontamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adicionar Observação
          </label>
          <Textarea
            placeholder="Descreva observações..."
            {...register("texto", { required: true })}
            rows={4}
          />
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Apontamento"}
          </Button>
        </form>

        {/* Histórico em Tabela */}
        <div className="border-t pt-4">
          {obs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Texto</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {obs.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.resposavel?.nome ?? "Sem autor"}</TableCell>
                    <TableCell>
                      {new Date(o.criadoEm).toLocaleString("pt-BR")}
                    </TableCell>
                    <TableCell>{o.texto}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(o.id)}
                        aria-label="Excluir apontamento"
                        title="Excluir apontamento"
                      >
                        <Trash className="h-2 w-2" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-sm">
              Nenhum apontamento cadastrado.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
