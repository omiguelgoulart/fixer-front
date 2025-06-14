"use client"

import { createContext, useContext, useState } from "react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

interface ContextoPlanejamentoProps {
  ordemSelecionada: OrdemServicoItf | null
  setOrdemSelecionada: (ordem: OrdemServicoItf) => void
  filtrarOrdens: (params: { busca: string }) => void
}

const ContextoPlanejamento = createContext<ContextoPlanejamentoProps>({
  ordemSelecionada: null,
  setOrdemSelecionada: () => {},
  filtrarOrdens: () => {} // valor padrão para evitar erro
})

export function ProvedorPlanejamento({
  children
}: {
  children: React.ReactNode
}) {
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null)

  const filtrarOrdens = ({ busca }: { busca: string }) => {
    console.log("🔍 Buscando por:", busca)
    // Aqui você pode implementar a lógica real de filtragem
  }

  return (
    <ContextoPlanejamento.Provider value={{ ordemSelecionada, setOrdemSelecionada, filtrarOrdens }}>
      {children}
    </ContextoPlanejamento.Provider>
  )
}

export const useContextoPlanejamento = () => useContext(ContextoPlanejamento)
