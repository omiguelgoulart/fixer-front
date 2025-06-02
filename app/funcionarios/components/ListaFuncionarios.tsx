"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import type { Funcionario } from "@/app/utils/types/funcionarios";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ListaFuncionariosProps {
  funcionarios: Funcionario[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
}

export default function ListaFuncionarios({
  funcionarios,
  onEditar,
  onExcluir,
}: ListaFuncionariosProps) {
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState<
    number | null
  >(null);

  const confirmarExclusao = () => {
    if (funcionarioParaExcluir !== null) {
      onExcluir(funcionarioParaExcluir);
      setFuncionarioParaExcluir(null);
    }
  };

  const formatarData = (dataString: string) => {
    try {
      const data = new Date(dataString);
      return format(data, "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dataString;
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Nome</th>
              <th className="text-left py-3 px-4 font-medium">Tipo</th>
              <th className="text-left py-3 px-4 font-medium">Departamento</th>
              <th className="text-left py-3 px-4 font-medium">Email</th>
              <th className="text-left py-3 px-4 font-medium">Telefone</th>
              <th className="text-left py-3 px-4 font-medium">
                Data de Contratação
              </th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">
                  Nenhum funcionário encontrado
                </td>
              </tr>
            ) : (
              funcionarios.map((funcionario) => (
                <tr key={funcionario.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{funcionario.nome}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={`${
                        funcionario.tipo === "gestor"
                          ? "border-blue-500 text-blue-700 bg-blue-50"
                          : funcionario.tipo === "gerente"
                          ? "border-purple-500 text-purple-700 bg-purple-50"
                          : "border-green-500 text-green-700 bg-green-50"
                      }`}
                    >
                      {funcionario.tipo === "gestor"
                        ? "Gestor"
                        : funcionario.tipo === "gerente"
                        ? "Gerente"
                        : "Técnico"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{funcionario.departamento}</td>
                  <td className="py-3 px-4">{funcionario.email}</td>
                  <td className="py-3 px-4">{funcionario.telefone}</td>
                  <td className="py-3 px-4">
                    {formatarData(funcionario.dataContratacao)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`${
                        funcionario.status === "ativo"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white hover:bg-opacity-80`}
                    >
                      {funcionario.status === "ativo" ? "Ativo" : "Inativo"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Ver detalhes">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Editar"
                        onClick={() => onEditar(funcionario.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Excluir"
                        onClick={() =>
                          setFuncionarioParaExcluir(funcionario.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={funcionarioParaExcluir !== null}
        onOpenChange={() => setFuncionarioParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este funcionário? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarExclusao}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
