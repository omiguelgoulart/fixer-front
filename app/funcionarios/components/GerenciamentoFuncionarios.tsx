"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListaFuncionarios from "./ListaFuncionarios";
import FormularioFuncionario from "./FormularioFuncionario";
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";
import { useFuncionarios } from "./useFuncionarios";

type TipoFuncionario = "todos" | "gestor" | "gerente" | "tecnico";

export interface ListaFuncionariosProps {
  funcionarios: FuncionarioItf[];
  onEditar: (id: number) => void;
}

export default function GerenciamentoFuncionarios() {
  const { criar, editar } = useFuncionarios();
  const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState<FuncionarioItf | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "gestor" | "gerente" | "tecnico">("todos");
  const [visualizacao, setVisualizacao] = useState<"lista" | "cadastro">("lista");



  const adicionarFuncionario = async (
    funcionario: Omit<FuncionarioItf, "id">
  ) => {
    await criar(funcionario);
    setFuncionarioEmEdicao(null);
    setVisualizacao("lista");
  };


  const atualizarFuncionarioFinal = async (funcionario: FuncionarioItf) => {
    await editar(funcionario.id, funcionario);
    setVisualizacao("lista");
  };



  return (
    <div className="space-y-6">

      <Tabs
        value={visualizacao}
        onValueChange={(v) => setVisualizacao(v as "lista" | "cadastro")}
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="lista" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Lista de Funcionários</span>
            </TabsTrigger>
            <TabsTrigger value="cadastro" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Cadastrar Funcionário</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lista" className="space-y-4 mt-4">
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
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => {
                      setFuncionarioEmEdicao(null);
                      setVisualizacao("cadastro");
                    }}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo Funcionário
                  </Button>
                </div>
              </div>

              <ListaFuncionarios />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cadastro" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <FormularioFuncionario
                funcionarioInicial={funcionarioEmEdicao}
                onCriar={adicionarFuncionario}
                onAtualizar={atualizarFuncionarioFinal}
                onCancelar={() => {
                  setFuncionarioEmEdicao(null);
                  setVisualizacao("lista");
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
