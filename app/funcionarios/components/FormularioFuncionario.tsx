"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import type { Funcionario } from "@/app/utils/types/FuncionarioItf";

interface FormularioFuncionarioProps {
  funcionarioInicial: Funcionario | null;
  onSalvar: (funcionario: Funcionario) => void;
  onCancelar: () => void;
}

export default function FormularioFuncionario({
  funcionarioInicial,
  onSalvar,
  onCancelar,
}: FormularioFuncionarioProps) {
  const [funcionario, setFuncionario] = useState<Funcionario>(
    () =>
      funcionarioInicial ??
      ({
        nome: "",
        email: "",
        telefone: "",
        tipo: "tecnico",
        dataContratacao: "",
        status: "ativo",
        // Adicione aqui quaisquer outros campos obrigatórios do tipo Funcionario
        // Exemplo: id: "", departamento: "", etc.
      } as Funcionario)
  );

  useEffect(() => {
    if (funcionarioInicial) {
      setFuncionario(funcionarioInicial);
    }
  }, [funcionarioInicial]);

  function handleChange<K extends keyof Funcionario>(
    key: K,
    value: Funcionario[K]
  ) {
    setFuncionario((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSalvar(funcionario);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-xl font-bold mb-4">
        {funcionarioInicial
          ? "Editar Funcionário"
          : "Cadastrar Novo Funcionário"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              value={funcionario.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={funcionario.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={funcionario.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Funcionário</Label>
            <Select
              value={funcionario.tipo}
              onValueChange={(value) =>
                handleChange("tipo", value as Funcionario["tipo"])
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gestor">Gestor</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="dataContratacao">Data de Contratação</Label>
          <Input
            id="dataContratacao"
            type="date"
            value={funcionario.dataContratacao}
            onChange={(e) => handleChange("dataContratacao", e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={funcionario.status}
            onValueChange={(value) =>
              handleChange("status", value as Funcionario["status"])
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {funcionarioInicial ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
