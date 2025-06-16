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
// Dados iniciais para demonstração
const funcionariosIniciais: FuncionarioItf[] = [
  {
    id: 1,
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@eixeq.com",
    telefone: "(11) 98765-4321",
    tipo: "gestor",
    departamento: "Manutenção",
    dataContratacao: "2020-05-15",
    status: "ativo",
    nivelAcesso: "administrador",
    equipes: ["Manutenção Preventiva", "Gestão de Ativos"],
  },
  {
    id: 2,
    nome: "Ana Silva",
    email: "ana.silva@eixeq.com",
    telefone: "(11) 91234-5678",
    tipo: "gerente",
    departamento: "Produção",
    dataContratacao: "2019-03-10",
    status: "ativo",
    areasResponsavel: ["Linha de Produção A", "Linha de Produção B"],
    metasDesempenho: "Redução de 5% no tempo de parada de máquinas",
  },
  {
    id: 3,
    nome: "Roberto Santos",
    email: "roberto.santos@eixeq.com",
    telefone: "(11) 97777-8888",
    tipo: "tecnico",
    departamento: "Manutenção",
    dataContratacao: "2021-07-20",
    status: "ativo",
    especialidades: ["Elétrica", "Automação"],
    certificacoes: ["NR-10", "SEP"],
    ferramentasHabilitado: ["Multímetro", "Osciloscópio"],
  },
  {
    id: 4,
    nome: "Juliana Costa",
    email: "juliana.costa@eixeq.com",
    telefone: "(11) 96666-7777",
    tipo: "tecnico",
    departamento: "Manutenção",
    dataContratacao: "2022-01-05",
    status: "ativo",
    especialidades: ["Mecânica", "Hidráulica"],
    certificacoes: ["NR-12", "NR-13"],
    ferramentasHabilitado: ["Torquímetro", "Paquímetro"],
  },
  {
    id: 5,
    nome: "Marcos Pereira",
    email: "marcos.pereira@eixeq.com",
    telefone: "(11) 95555-6666",
    tipo: "gerente",
    departamento: "Logística",
    dataContratacao: "2018-11-12",
    status: "ativo",
    areasResponsavel: ["Expedição", "Recebimento"],
    metasDesempenho: "Otimização do fluxo de materiais para manutenção",
  },
];

export default function GerenciamentoFuncionarios() {
  const [funcionarios, setFuncionarios] =
    useState<FuncionarioItf[]>(funcionariosIniciais);
  const [funcionarioEmEdicao, setFuncionarioEmEdicao] =
    useState<FuncionarioItf | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  const [visualizacao, setVisualizacao] = useState<"lista" | "cadastro">(
    "lista"
  );

  // Filtrar funcionários
  const funcionariosFiltrados = funcionarios.filter((funcionario) => {
    const matchBusca =
      funcionario.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      funcionario.email.toLowerCase().includes(termoBusca.toLowerCase());

    const matchTipo = filtroTipo === "todos" || funcionario.tipo === filtroTipo;

    return matchBusca && matchTipo;
  });

  // Adicionar novo funcionário
  const adicionarFuncionario = (funcionario: Omit<FuncionarioItf, "id">) => {
    const novoId = Math.max(...funcionarios.map((f) => f.id)) + 1;
    const novoFuncionario = { ...funcionario, id: novoId };
    setFuncionarios([...funcionarios, novoFuncionario]);
    setVisualizacao("lista");
  };

  // Atualizar funcionário existente
  const atualizarFuncionario = (funcionario: FuncionarioItf) => {
    setFuncionarios(
      funcionarios.map((f) => (f.id === funcionario.id ? funcionario : f))
    );
    setFuncionarioEmEdicao(null);
    setVisualizacao("lista");
  };

  // Excluir funcionário
  const excluirFuncionario = (id: number) => {
    setFuncionarios(funcionarios.filter((f) => f.id !== id));
  };

  // Iniciar edição de funcionário
  const editarFuncionario = (id: number) => {
    const funcionario = funcionarios.find((f) => f.id === id);
    if (funcionario) {
      setFuncionarioEmEdicao(funcionario);
      setVisualizacao("cadastro");
    }
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
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
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

              <ListaFuncionarios
                funcionarios={funcionariosFiltrados}
                onEditar={editarFuncionario}
                onExcluir={excluirFuncionario}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cadastro" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <FormularioFuncionario
                funcionarioInicial={funcionarioEmEdicao}
                onSalvar={
                  funcionarioEmEdicao
                    ? atualizarFuncionario
                    : adicionarFuncionario
                }
                onCancelar={() => setVisualizacao("lista")}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
