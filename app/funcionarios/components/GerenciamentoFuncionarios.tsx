"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ListaFuncionarios from "./ListaFuncionarios";
import FormularioFuncionario from "./FormularioFuncionario";
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";
import { useFuncionarios } from "./useFuncionarios";

type TipoFuncionario = "todos" | "gestor" | "gerente" | "tecnico";

export default function GerenciamentoFuncionarios() {
  const { criar, editar } = useFuncionarios();
  const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState<FuncionarioItf | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoFuncionario>("todos");

  const adicionarFuncionario = async (
    funcionario: Omit<FuncionarioItf, "id">
  ) => {
    await criar(funcionario);
    setFuncionarioEmEdicao(null);
    setMostrarFormulario(false);
  };

  const atualizarFuncionarioFinal = async (funcionario: FuncionarioItf) => {
    await editar(funcionario.id, funcionario);
    setMostrarFormulario(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar funcionários..."
                className="pl-8"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select
                value={filtroTipo}
                onValueChange={(value: TipoFuncionario) =>
                  setFiltroTipo(value)
                }
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="tecnico">Técnico</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setFuncionarioEmEdicao(null);
                  setMostrarFormulario(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Funcionário
              </Button>
            </div>
          </div>

          <ListaFuncionarios />
        </CardContent>
      </Card>

      <Dialog open={mostrarFormulario} onOpenChange={setMostrarFormulario}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {funcionarioEmEdicao ? "Editar Funcionário" : "Novo Funcionário"}
            </DialogTitle>
          </DialogHeader>

          <FormularioFuncionario
            funcionarioInicial={funcionarioEmEdicao}
            onCriar={adicionarFuncionario}
            onAtualizar={atualizarFuncionarioFinal}
            onCancelar={() => {
              setFuncionarioEmEdicao(null);
              setMostrarFormulario(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
