"use client"

import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export default function AbaProcedimentos() {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-6">Procedimentos indicados</h3>

      <div className="mb-6">
        <h4 className="font-medium text-center mb-4">Lubrificação preventiva</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">▶</div>
            <div>Utilizar EPI completo</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">◆</div>
            <div>Confirmar torque dos parafusos após remontagem</div>
          </div>

          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">▶</div>
            <div>Desligar máquina da rede elétrica</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">◆</div>
            <div>Anotar fotos antes e depois do procedimento</div>
          </div>

          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">▶</div>
            <div>Aguardar 10 minutos para esfriamento</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">◆</div>
            <div>Limpar</div>
          </div>

          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">▶</div>
            <div>Seguir o procedimento POP-042</div>
          </div>
          <div className="flex items-start gap-2">
            <div className="min-w-4 mt-1">◆</div>
            <div>Testar</div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-medium mb-4">Manual do ativo</h4>
        <div className="flex items-center gap-2 p-2 border rounded-md w-fit">
          <FileText className="h-5 w-5 text-blue-500" />
          <span>Motor.pdf</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Adicionar a lista</Button>
      </div>
    </div>
  )
}
