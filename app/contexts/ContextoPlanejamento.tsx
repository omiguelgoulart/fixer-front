"use client"

import { createContext, useContext, useState } from "react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

interface ContextoPlanejamentoProps {
  ordemSelecionada: OrdemServicoItf | null
  setOrdemSelecionada: (ordem: OrdemServicoItf) => void
}

const ContextoPlanejamento = createContext<ContextoPlanejamentoProps>({
  ordemSelecionada: null,
  setOrdemSelecionada: () => {}
})

export function ProvedorPlanejamento({
  children,
  // dadosIniciais
}: {
  children: React.ReactNode
  dadosIniciais: OrdemServicoItf[]
}) {
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null)

  return (
    <ContextoPlanejamento.Provider value={{ ordemSelecionada, setOrdemSelecionada }}>
      {children}
    </ContextoPlanejamento.Provider>
  )
}

export const useContextoPlanejamento = () => useContext(ContextoPlanejamento)
