"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { toast } from "sonner"

interface Props {
  ordem: OrdemServicoItf
}

export default function AbaApontamentos({ ordem }: Props) {
  const [observacoes, setObservacoes] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFim, setHoraFim] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleAnotar() {
    if (!observacoes.trim()) {
      toast.warning("Digite uma observação antes de anotar.")
      return
    }

    if (!horaInicio || !horaFim) {
      toast.warning("Informe o horário de início e de fim.")
      return
    }

    setLoading(true)

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}/apontamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: observacoes,
          horaInicio,
          horaFim,
        }),
      })

      toast.success("Apontamento adicionado com sucesso!")

      // Limpa os campos após sucesso
      setObservacoes("")
      setHoraInicio("")
      setHoraFim("")
    } catch (error) {
      console.error("Erro ao adicionar apontamento:", error)
      toast.error("Erro ao adicionar apontamento.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Executantes</h3>
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-1">
              {ordem.responsavel?.nome ?? "-"}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Hora de início</h3>
            <Input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Hora de fim</h3>
            <Input
              type="time"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Observações</h3>
          <Textarea
            placeholder="Digite suas observações aqui..."
            className="min-h-[200px]"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />

          <div className="mt-4 flex justify-end">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleAnotar}
              disabled={loading}
            >
              {loading ? "Anotando..." : "Anotar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
