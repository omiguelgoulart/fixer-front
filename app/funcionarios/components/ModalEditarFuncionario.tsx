"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select"
import { FuncionarioItf, TipoFuncionario } from "@/app/utils/types/FuncionarioItf"
import { useFuncionarios } from "./useFuncionarios"

interface ModalEditarFuncionarioProps {
  aberto: boolean
  onFechar: () => void
  funcionario: FuncionarioItf | null
  onSalvar: (dados: FuncionarioItf) => Promise<void>
}


export default function ModalEditarFuncionario({  aberto,  onFechar,  funcionario,}: ModalEditarFuncionarioProps) {
  const { editar } = useFuncionarios()
  const { register, handleSubmit, setValue, reset, watch, formState: { errors },  } = useForm<Omit<FuncionarioItf, "id">>()

  const tipo = watch("tipo")
  const ativo = watch("ativo")

  useEffect(() => {
    if (funcionario) {
      reset({
        nome: funcionario.nome,
        email: funcionario.email,
        telefone: funcionario.telefone,
        tipo: funcionario.tipo,
        dataContratacao: funcionario.dataContratacao
  ? new Date(funcionario.dataContratacao).toISOString().split("T")[0]
  : undefined,
        ativo: funcionario.ativo,
      })

      // campos externos ao register
      setValue("tipo", funcionario.tipo)
      setValue("ativo", funcionario.ativo)
    }
  }, [funcionario, reset, setValue])

  const onSubmit = async (data: Omit<FuncionarioItf, "id">) => {
    if (!funcionario) return

    await editar(funcionario.id, data)
    onFechar()
  }

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
        </DialogHeader>

        {funcionario && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" {...register("nome", { required: true })} />
                  {errors.nome && <p className="text-red-500 text-sm">Nome é obrigatório</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email", { required: true })} />
                  {errors.email && <p className="text-red-500 text-sm">Email é obrigatório</p>}
                </div>

                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" {...register("telefone", { required: true })} />
                  {errors.telefone && (
                    <p className="text-red-500 text-sm">Telefone é obrigatório</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tipo">Tipo de Funcionário</Label>
                  <Select
                    value={tipo}
                    onValueChange={(value) => setValue("tipo", value as TipoFuncionario)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GESTOR">Gestor</SelectItem>
                      <SelectItem value="GERENTE">Gerente</SelectItem>
                      <SelectItem value="TECNICO">Técnico</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipo && <p className="text-red-500 text-sm">Tipo é obrigatório</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="dataContratacao">Data de Contratação</Label>
                  <Input
                    id="dataContratacao"
                    type="date"
                    {...register("dataContratacao", { required: true })}
                  />
                  {errors.dataContratacao && (
                    <p className="text-red-500 text-sm">Data é obrigatória</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="ativo">Status</Label>
                  <Select
                    value={ativo ? "ativo" : "inativo"}
                    onValueChange={(value) => setValue("ativo", value === "ativo")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ativo && (
                    <p className="text-red-500 text-sm">Status é obrigatório</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onFechar}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Atualizar
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
