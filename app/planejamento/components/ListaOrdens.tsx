"use client"

import { useEffect, useState } from "react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import CardPlanejamentoOrdem from "./CardOrdemPlanejamento"

interface Props {
  onSelect: (ordem: OrdemServicoItf) => void
}

export default function ListaOrdens({ onSelect }: Props) {
  const [ordensServico, setOrdensServico] = useState<OrdemServicoItf[]>([])
  const [carregando, setCarregando] = useState(true)
  const [ordemSelecionadaId, setOrdemSelecionadaId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchOrdemServico() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`, {
          cache: "no-store"
        })
        const dados = await response.json()
        setOrdensServico(dados)
      } catch {
        console.error("Erro ao carregar OrdemServico")
      } finally {
        setCarregando(false)
      }
    }
    fetchOrdemServico()
  }, [])

  async function selecionarOrdem(id: number) {
    setOrdemSelecionadaId(id)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${id}/os`)
      const dados = await response.json()
      onSelect(dados)
    } catch (error) {
      console.error("Erro ao carregar detalhes da ordem", error)
    }
  }

  if (carregando) {
    return <div className="p-4 text-gray-500">Carregando ordens...</div>
  }

  return (
  <ul className="">
      {ordensServico.map((ordem) => (
        <CardPlanejamentoOrdem
          key={ordem.id}
          ordem={ordem}
          selecionada={ordemSelecionadaId === ordem.id}
          onClick={() => selecionarOrdem(ordem.id)}
        />
      ))}
    </ul>
  )
}