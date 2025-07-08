"use client"

import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { usePlanejamento } from "../stores/usePlanejamento"

interface Props {
  ordemServicoId: number
  onSuccess?: () => void
}

type FormData = {
  nome: string
  quantidade: number
  ordemServicoId: number
}

export default function FormItens({ ordemServicoId, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      quantidade: 1,
      ordemServicoId
    }
  })

  const { criarInsumo } = usePlanejamento()

  async function onSubmit(data: FormData) {
    const payload = {
      nome: data.nome,
      quantidade: Number(data.quantidade),
      ordemServicoId: Number(data.ordemServicoId),
    }

    try {
      await criarInsumo(payload)
      toast.success("Item adicionado com sucesso!")
      reset({ nome: "", quantidade: 1, ordemServicoId: payload.ordemServicoId })
      onSuccess?.()
    } catch (err: unknown) {
      console.error("🚨 Falha ao cadastrar insumo:", err)
      if (err instanceof Error) {
        toast.error(err.message || "Erro ao adicionar item. Tente novamente.")
      } else {
        toast.error("Erro ao adicionar item. Tente novamente.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 rounded-md bg-white mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">
            Nome do Insumo <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              id="nome"
              placeholder="Ex: Parafuso M6"
              {...register("nome", { required: "O nome do insumo é obrigatório" })}
              className={errors.nome ? "border-red-500" : ""}
            />
          </div>
          {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
        </div>

        <div>
          <Label htmlFor="quantidade">
            Quantidade <span className="text-red-500">*</span>
          </Label>
          <div className="mt-2">
            <Input
              id="quantidade"
              type="number"
              min={1}
              {...register("quantidade", {
                required: "A quantidade é obrigatória",
                valueAsNumber: true,
                min: { value: 1, message: "Mínimo de 1 unidade" }
              })}
              className={errors.quantidade ? "border-red-500" : ""}
            />
          </div>
          {errors.quantidade && (
            <p className="text-sm text-red-500">{errors.quantidade.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset({ nome: "", quantidade: 1, ordemServicoId })}
        >
          Limpar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar Insumo"}
        </Button>
      </div>
    </form>
  )
}
