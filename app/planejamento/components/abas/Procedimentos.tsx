"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Loader2, Plus, Check, PlayCircle, Diamond } from "lucide-react"

export default function Procedimentos() {
  const [loading, setLoading] = useState(false)

  const procedimentos = [
    { icone: "▶", texto: "Desligar máquina da rede elétrica" },
    { icone: "◆", texto: "Anotar fotos antes e depois do procedimento" },
    { icone: "▶", texto: "Aguardar 10 minutos para esfriamento" },
    { icone: "◆", texto: "Limpar" },
    { icone: "▶", texto: "Seguir o procedimento POP-042" },
    { icone: "◆", texto: "Testar" },
  ]

  const observacoesIniciais = [
    "Utilizar EPI completo",
    "Confirmar torque dos parafusos após remontagem",
  ]

  const handleAdicionar = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert("Procedimentos adicionados com sucesso!")
    }, 1500)
  }

  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-6">Procedimentos indicados</h3>

        <div className="mb-6 space-y-6">
          <h4 className="font-medium text-base mb-4">Lubrificação preventiva</h4>


          {/* Observações iniciais */}
          <div className="space-y-2 mb-6">
            {observacoesIniciais.map((obs, index) => (
              <div key={`obs-${index}`} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <div>{obs}</div>
              </div>
            ))}
          </div>

          {/* Procedimentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {procedimentos.map((proc, index) => (
              <div key={`proc-${index}`} className="flex items-start gap-2">
                {proc.icone === "▶" ? (
                  <PlayCircle className="h-5 w-5 text-blue-500 mt-1" />
                ) : (
                  <Diamond className="h-5 w-5 text-black mt-1" />
                )}
                <div>{proc.texto}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Manual do ativo</h4>
        <div className="flex items-center gap-2 p-2 border rounded-md w-fit cursor-pointer hover:bg-gray-50">
          <FileText className="h-5 w-5 text-blue-500" />
          <span>Motor.pdf</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
          onClick={handleAdicionar}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          {loading ? "Adicionando..." : "Adicionar à lista"}
        </Button>
      </div>
    </div>
  )
}
