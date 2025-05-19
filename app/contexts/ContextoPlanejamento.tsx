"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { OpcoesFiltro, OrdemServicoItf } from "../utils/types/planejamento"

interface ContextoPlanejamentoType {
  ordens: OrdemServicoItf[]
  ordensFiltradas: OrdemServicoItf[]
  ordemSelecionadaId: number | null
  ordemSelecionada: OrdemServicoItf | null
  selecionarOrdem: (id: number) => void
  filtrarOrdens: (opcoes: OpcoesFiltro) => void
}

const ContextoPlanejamento = createContext<ContextoPlanejamentoType | undefined>(undefined)

export function ProvedorPlanejamento({
  children,
  dadosIniciais,
}: {
  children: ReactNode
  dadosIniciais: OrdemServicoItf[]
}) {
  const [ordens] = useState<OrdemServicoItf[]>(dadosIniciais)
  const [ordensFiltradas, setOrdensFiltradas] = useState<OrdemServicoItf[]>(dadosIniciais)
  const [ordemSelecionadaId, setOrdemSelecionadaId] = useState<number | null>(
    dadosIniciais.length > 0 ? dadosIniciais[0].id : null,
  )

  const ordemSelecionada = ordemSelecionadaId ? ordens.find((ordem) => ordem.id === ordemSelecionadaId) || null : null

  const selecionarOrdem = (id: number) => {
    setOrdemSelecionadaId(id)
  }

  const filtrarOrdens = (opcoes: OpcoesFiltro) => {
    let filtradas = [...ordens]

    if (opcoes.busca) {
      const buscaLower = opcoes.busca.toLowerCase()
      filtradas = filtradas.filter(
        (ordem) => ordem.id.toString().includes(buscaLower) || ordem.titulo.toLowerCase().includes(buscaLower),
      )
    }

    if (opcoes.status) {
      filtradas = filtradas.filter((ordem) => ordem.status === opcoes.status)
    }

    if (opcoes.prioridade) {
      filtradas = filtradas.filter((ordem) => ordem.prioridade === opcoes.prioridade)
    }

    setOrdensFiltradas(filtradas)
  }

  return (
    <ContextoPlanejamento.Provider
      value={{
        ordens: ordensFiltradas,
        ordensFiltradas,
        ordemSelecionadaId,
        ordemSelecionada,
        selecionarOrdem,
        filtrarOrdens,
      }}
    >
      {children}
    </ContextoPlanejamento.Provider>
  )
}

export function useContextoPlanejamento() {
  const contexto = useContext(ContextoPlanejamento)
  if (contexto === undefined) {
    throw new Error("useContextoPlanejamento deve ser usado dentro de um ProvedorPlanejamento")
  }
  return contexto
}
