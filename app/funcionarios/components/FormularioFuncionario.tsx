"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FuncionarioItf,
  TipoFuncionario,
} from "@/app/utils/types/FuncionarioItf"

interface Props {
  funcionarioInicial?: FuncionarioItf | null
  onCriar: (data: Omit<FuncionarioItf, "id">) => void
  onAtualizar: (data: FuncionarioItf) => void
  onCancelar: () => void
}

export default function FormularioFuncionario({  funcionarioInicial,  onCriar,  onAtualizar,  onCancelar,}: Props) {
  const { register, handleSubmit, setValue, reset, formState: { errors }  } = useForm<Omit<FuncionarioItf, "id">>()

  useEffect(() => {
    if (funcionarioInicial) {
      reset({
        nome: funcionarioInicial.nome,
        email: funcionarioInicial.email,
        telefone: funcionarioInicial.telefone,
        tipo: funcionarioInicial.tipo,
        dataContratacao: funcionarioInicial.dataContratacao,
        ativo: funcionarioInicial.ativo,
      })
    } else {
      reset()
    }
  }, [funcionarioInicial, reset])

function gerarSenhaPadrao(nome: string): string {
  const nomeLimpo = nome.replace(/\s+/g, "")
  const primeiraLetraMaiuscula =
    nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1).toLowerCase()
  const anoAtual = new Date().getFullYear()
  return `${primeiraLetraMaiuscula}${anoAtual}#`
}




const handleFormSubmit = (data: Omit<FuncionarioItf, "id">) => {
  if (funcionarioInicial) {
    console.log("Dados enviados para atualização:", { ...data, id: funcionarioInicial.id })
    onAtualizar({ ...data, id: funcionarioInicial.id })
  } else {
    const senhaPadrao = gerarSenhaPadrao(data.nome)
    console.log("Dados enviados para criação:", { ...data, senha: senhaPadrao })
    onCriar({ ...data, senha: senhaPadrao })
  }

  reset()
  onCancelar()
}



  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="text-xl font-bold mb-4">
        {funcionarioInicial ? "Editar Funcionário" : "Cadastrar Novo Funcionário"}
      </div>

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
            {errors.telefone && <p className="text-red-500 text-sm">Telefone é obrigatório</p>}
          </div>

          <div>
            <Label htmlFor="tipo">Tipo de Funcionário</Label>
            <Select
              defaultValue={funcionarioInicial?.tipo}
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
              defaultValue={
                funcionarioInicial
                  ? funcionarioInicial.ativo
                    ? "ativo"
                    : "inativo"
                  : undefined
              }
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
        <Button type="button" variant="outline" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
          {funcionarioInicial ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  )
}
