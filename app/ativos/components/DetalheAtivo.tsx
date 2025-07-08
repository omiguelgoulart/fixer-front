"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ModalEditarAtivo from "./ModalEditarAtivo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, X } from "lucide-react";
import { SubAtivoItf } from "@/app/utils/types/ativo/SubAtivoItf";
import HistoricoFalhas from "./HistoricoFalhas";
import { useAtivos } from "../stores/useAtivos";

interface DetalhesAtivoProps {
  ativoId: number;
  onVoltar: () => void;
}

export default function DetalhesAtivo({
  ativoId,
  onVoltar,
}: DetalhesAtivoProps) {
  const { ativoSelecionado, carregarAtivoPorId, excluirAtivo, carregando } =
    useAtivos();

  const [modalAberto, setModalAberto] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  useEffect(() => {
    carregarAtivoPorId(ativoId);
  }, [ativoId, carregarAtivoPorId]);

  const handleExcluir = async () => {
    try {
      await excluirAtivo(ativoId);
      toast.success("Ativo excluído com sucesso");
      setConfirmarExclusao(false);
      onVoltar();
    } catch {
      toast.error("Erro ao excluir ativo");
    }
  };

  if (carregando) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-6 w-2/3 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
        <div className="h-40 bg-gray-100 rounded-md" />
      </div>
    );
  }

  if (!ativoSelecionado)
    return <p className="text-gray-500">Ativo não encontrado.</p>;

  const ativo = ativoSelecionado;

  const obterCorCriticidade = (criticidade: string) => {
    switch (criticidade.toUpperCase()) {
      case "ALTA":
        return "bg-red-500";
      case "MEDIA":
        return "bg-yellow-500";
      case "BAIXA":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const obterCorSituacao = (situacao: string) => {
    switch (situacao.toUpperCase()) {
      case "ATIVO":
        return "bg-green-500";
      case "INATIVO":
        return "bg-gray-500";
      case "MANUTENCAO":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm border overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-6 border-b">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-snug">{ativo.nome}</h2>
          <p className="text-sm text-gray-500">
            {ativo.tipo_ativo} • {ativo.modelo}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-row gap-2 items-center">
          {/* Situação do ativo */}
          <Badge className={obterCorSituacao(ativo.situacao)}>
            {ativo.situacao}
          </Badge>

          {/* Criticidade do ativo */}
          <Badge className={obterCorCriticidade(ativo.criticidade)}>
            Criticidade: {ativo.criticidade}
          </Badge>

          {/* Botão voltar */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 text-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Botão editar */}
          <Button
            variant="outline"
            size="icon"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          {/* Botão deletar */}
          <Button
            variant="destructive"
            size="icon"
            className="hover:bg-red-600 hover:text-white"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {ativo.foto && (
          <div className="md:basis-1/3 flex justify-center items-start">
            <div className="relative w-full max-w-xs h-72 border rounded-md overflow-hidden">
              <img
                src={ativo.foto}
                alt={`Foto de ${ativo.nome}`}
                className="object-contain bg-white"
                width={300}
                height={288}
              />
            </div>
          </div>
        )}

        <div className="md:basis-2/3 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Código</p>
              <p>{ativo.codigo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Fabricante</p>
              <p>{ativo.fabricante}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Modelo</p>
              <p>{ativo.modelo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Data de Aquisição
              </p>
              <p>{ativo.data_aquisicao?.split("T")[0]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Localização Interna
              </p>
              <p>{ativo.localizacao_interna || "-"}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">🔧 Subativos</h3>
            {ativo.subativos?.length ? (
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {ativo.subativos.map((sub: SubAtivoItf) => (
                  <li key={sub.id}>
                    {sub.nome}
                    <span className="text-gray-400 text-xs">
                      {" "}
                      ({sub.codigo})
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum subativo cadastrado.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* 📋 Histórico de ordens de serviço */}
        <HistoricoFalhas ordens={ativo.ordensServico || []} />
      </div>

      {modalAberto && (
        <ModalEditarAtivo
          aberto={modalAberto}
          aoFechar={() => setModalAberto(false)}
          ativo={ativoSelecionado}
          aoAtualizar={() => carregarAtivoPorId(ativo.id)}
        />
      )}

      <Dialog open={confirmarExclusao} onOpenChange={setConfirmarExclusao}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deseja realmente excluir este ativo?</DialogTitle>
            <p className="text-sm text-gray-500">
              Essa ação não poderá ser desfeita.
            </p>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmarExclusao(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleExcluir}>
              Confirmar exclusão
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
