"use client"

import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import ptBrLocale from "@fullcalendar/core/locales/pt-br"

import ModalDetalhe from "./ModalDetalhe" // Importa o seu modal

type EventoCalendario = {
  id: string
  title: string
  start: string
  color: string
}

export default function CalendarioManutencoes() {
  const [manutencoes, setManutencoes] = useState<EventoCalendario[]>([])
  const [ordensServicos, setOrdensServicos] = useState<OrdemServicoItf[]>([])
  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null)
  const [modalAberto, setModalAberto] = useState(false)

  useEffect(() => {
    const fetchManutencoes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico`)
        const data: OrdemServicoItf[] = await response.json()

        // Guarda as OS originais
        setOrdensServicos(data)

        // Mapeia para eventos do FullCalendar
        const eventosFormatados = data.map((ordem) => ({
          id: ordem.id.toString(),
          title: `${ordem.titulo} - ${ordem.ativo?.nome ?? "Ativo não informado"}`,
          start: ordem.dataInicioPlanejada,
          color:
            ordem.prioridade === "ALTA"
              ? "#f87171"
              : ordem.prioridade === "MEDIA"
              ? "#facc15"
              : "#4ade80",
        }))

        setManutencoes(eventosFormatados)
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço", error)
      }
    }

    fetchManutencoes()
  }, [])

  return (
    <div className="p-4 bg-white rounded shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={ptBrLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Lista",
        }}
        events={manutencoes}
        eventClick={(info) => {
          const ordemId = info.event.id
          const ordem = ordensServicos.find((o) => o.id.toString() === ordemId)
          if (ordem) {
            setOrdemSelecionada(ordem)
            setModalAberto(true)
          }
        }}
        height="auto"
      />

      {/* Modal com os detalhes da OS */}
      <ModalDetalhe
        ordem={ordemSelecionada}
        open={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  )
}
