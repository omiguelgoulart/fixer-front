'use client'

import { useEffect, useState } from "react"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { cn } from "@/lib/utils"

interface Props {
  onSelect: (ordem: OrdemServicoItf) => void
}

export default function ListaOrdens({ onSelect }: Props) {
  const [ordensServico, setOrdensServico] = useState<OrdemServicoItf[]>([])
  const [carregando, setCarregando] = useState(true)
  const [ordemSelecionadaId, setOrdemSelecionadaId] = useState<number | null>(null)

  // Carrega as ordens de serviço ao montar o componente
  // e armazena no estado ordensServico
  useEffect(() => {
    async function fetchOrdemServico() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`)
        const dados = await response.json()
        setOrdensServico(dados)
      } catch {
        console.error("Erro ao carregar OrdemServico")
      } finally {
        setCarregando(false)
      }
    }
    fetchOrdemServico()
 }, []);

  // Função para selecionar uma ordem e carregar seus detalhes
  // e chamar a função onSelect com os dados da ordem
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
    <ul className="divide-y">
      {ordensServico.map((ordem) => (
      <li
        key={ordem.id}
        className={cn("p-4 cursor-pointer hover:bg-gray-50", ordemSelecionadaId === ordem.id && "bg-blue-50")}
        onClick={() => selecionarOrdem(ordem.id)}
      >
        <div className="font-medium text-sm flex items-center gap-2">
        <span className="text-xs text-gray-400">- {ordem.codigo}</span>
        <span>{ordem.titulo}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {ordem.status
          ? ordem.status.replace("_", " ").toLowerCase()
          : "Em aberto"}
        </span>
        <span
          className={cn(
          "px-2 py-0.5 rounded-full text-white",
          ordem.prioridade === "ALTA" && "bg-red-500",
          ordem.prioridade === "MEDIA" && "bg-yellow-500",
          ordem.prioridade === "BAIXA" && "bg-green-500"
          )}
        >
          {ordem.prioridade}
        </span>
        </div>
      </li>
      ))}
    </ul>
  )
}