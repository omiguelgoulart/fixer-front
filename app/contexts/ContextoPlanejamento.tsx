// app/contexts/ContextoPlanejamento.tsx
import { createContext, useContext, useState, ReactNode } from "react"
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"

type ContextoProps = {
  ordens: OrdemServicoItf[]
  ordensFiltradas: OrdemServicoItf[]
  filtrarOrdens: (params: { busca?: string; status?: string }) => void
}

const ContextoPlanejamento = createContext<ContextoProps | undefined>(undefined)

export function ContextoPlanejamentoProvider({ children, ordens }: { children: ReactNode; ordens: OrdemServicoItf[] }) {
  const [ordensBase] = useState(ordens)
  const [ordensFiltradas, setOrdensFiltradas] = useState(ordens)

  function filtrarOrdens({ busca, status }: { busca?: string; status?: string }) {
    let resultado = ordensBase

    if (busca !== undefined) {
      const termo = busca.toLowerCase()
      resultado = resultado.filter(o =>
        o.titulo.toLowerCase().includes(termo) ||
        o.ativo.nome.toLowerCase().includes(termo) ||
        o.ativo.localizacao_interna?.toLowerCase().includes(termo)
      )
    }

    if (status) {
      const st = status === "em-aberto" ? "EM_ABERTO" : "CONCLUIDA"
      resultado = resultado.filter(o => o.status === st)
    }

    setOrdensFiltradas(resultado)
  }

  return (
    <ContextoPlanejamento.Provider value={{ ordens: ordensBase, ordensFiltradas, filtrarOrdens }}>
      {children}
    </ContextoPlanejamento.Provider>
  )
}

export function useContextoPlanejamento() {
  const ctx = useContext(ContextoPlanejamento)
  if (!ctx) throw new Error("useContextoPlanejamento must be used within provider")
  return ctx
}
