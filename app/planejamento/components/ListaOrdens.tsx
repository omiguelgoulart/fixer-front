"use client"


import { useContextoPlanejamento } from "@/app/contexts/ContextoPlanejamento"
import { cn } from "@/lib/utils"

export default function ListaOrdens() {
  const { ordens, ordemSelecionadaId, selecionarOrdem } = useContextoPlanejamento()

  return (
    <div className="overflow-auto max-h-[calc(100vh-250px)]">
      <ul className="divide-y">
        {ordens.map((ordem) => (
          <li
            key={ordem.id}
            className={cn("p-4 hover:bg-gray-50 cursor-pointer", ordemSelecionadaId === ordem.id && "bg-blue-50")}
            onClick={() => selecionarOrdem(ordem.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <span className="text-xs">#{ordem.id.toString().slice(-2)}</span>
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-sm">{ordem.titulo}</h3>
                <p className="text-xs text-gray-500">#{ordem.id}</p>

                <div className="flex items-center mt-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Em aberto</span>

                  <span
                    className={cn(
                      "ml-2 text-xs text-white px-2 py-0.5 rounded-full",
                      ordem.prioridade === "Alta" && "bg-red-500",
                      ordem.prioridade === "Média" && "bg-yellow-500",
                      ordem.prioridade === "Baixa" && "bg-green-500",
                    )}
                  >
                    {ordem.prioridade}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
