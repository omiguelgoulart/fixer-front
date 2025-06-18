"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {  AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,  AlertDialogDescription,  AlertDialogFooter,  AlertDialogHeader,  AlertDialogTitle,} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFuncionarios } from "./useFuncionarios";
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";
import ModalEditarFuncionario from "./ModalEditarFuncionario";



export default function ListaFuncionarios() {

  const { funcionarios, listar, excluir, editar } = useFuncionarios();
  const [funcionarioParaExcluir, setFuncionarioParaExcluir] = useState<number | null >(null);
  const [funcionarioEmEdicao, setFuncionarioEmEdicao] = useState<FuncionarioItf | null>(null);

  useEffect(() => {
    listar();
  }, [listar]);

  const confirmarExclusao = async () => {
    if (funcionarioParaExcluir !== null) {
      try {
        await excluir(funcionarioParaExcluir);
        setFuncionarioParaExcluir(null);
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
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

    const salvarEdicao = async (dados: FuncionarioItf) => {
    try {
      await editar(dados.id, {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        tipo: dados.tipo,
        dataContratacao: dados.dataContratacao,
        ativo: dados.ativo,
      })
    } catch (err) {
      console.error("Erro ao editar:", err)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Nome</th>
              <th className="text-left py-3 px-4 font-medium">Tipo</th>
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
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  Nenhum funcionário encontrado
                </td>
              </tr>
            ) : (
              funcionarios.map((f: FuncionarioItf) => (
                <tr key={f.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{f.nome}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={
                        f.tipo === "GESTOR"
                          ? "border-blue-500 text-blue-700 bg-blue-50"
                          : f.tipo === "GERENTE"
                          ? "border-purple-500 text-purple-700 bg-purple-50"
                          : "border-green-500 text-green-700 bg-green-50"
                      }
                    >
                      {f.tipo === "GESTOR" && "Gestor"}
                      {f.tipo === "GERENTE" && "Gerente"}
                      {f.tipo === "TECNICO" && "Técnico"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{f.email}</td>
                  <td className="py-3 px-4">{f.telefone}</td>
                  <td className="py-3 px-4">
                    {formatarData(f.dataContratacao ?? "")}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`${
                        f.ativo ? "bg-green-500" : "bg-red-500"
                      } text-white hover:bg-opacity-80`}
                    >
                      {f.ativo ? "Ativo" : "Inativo"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Editar"
                        onClick={() => setFuncionarioEmEdicao(f)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Excluir"
                        onClick={() => setFuncionarioParaExcluir(f.id)}
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


      {/* Modal de edição */}
      <ModalEditarFuncionario
        aberto={!!funcionarioEmEdicao}
        funcionario={funcionarioEmEdicao}
        onFechar={() => setFuncionarioEmEdicao(null)}
        onSalvar={salvarEdicao}
      />
    </>

  );
}
