"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import ModalDetalhe from "./ModalDetalhe";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { usePlanejamento } from "../stores/usePlanejamento";
import  ModalNovaOrdem  from "./ModalNovaOrdem";

export default function CalendarioManutencoes() {
  const { manutencoes, ordens, fetchOrdens } = usePlanejamento();

  const [ordemSelecionada, setOrdemSelecionada] = useState<OrdemServicoItf | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [viewAtual, setViewAtual] = useState<"dayGridMonth" | "timeGridWeek">("dayGridMonth");

  const [novaOrdemAberta, setNovaOrdemAberta] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null); // data clicada

  useEffect(() => {
    fetchOrdens();
  }, [fetchOrdens]);

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      {/* Tabs para alternar entre mês e semana */}
      <Tabs
        value={viewAtual}
        onValueChange={(value) => setViewAtual(value as "dayGridMonth" | "timeGridWeek")}
      >
        <TabsList>
          <TabsTrigger value="dayGridMonth">Mês</TabsTrigger>
          <TabsTrigger value="timeGridWeek">Semana</TabsTrigger>
        </TabsList>
      </Tabs>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={viewAtual}
        locale={ptBrLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
        }}
        events={manutencoes}
        slotMinTime="05:00:00"
        slotMaxTime="20:00:00"
        slotDuration="00:30:00"
        slotLabelInterval="01:00"
        expandRows={true}
        height="auto"
        nowIndicator={true}
        key={viewAtual}
        eventClick={(info) => {
          const ordemId = info.event.id;
          const ordem = ordens.find((o) => o.id.toString() === ordemId);
          if (ordem) {
            setOrdemSelecionada(ordem);
            setModalAberto(true);
          }
        }}
        dateClick={(info) => {
          setDataSelecionada(info.dateStr); // pega a data/hora do clique
          setNovaOrdemAberta(true);
        }}
      />

      {/* Modal de detalhes da OS */}
      <ModalDetalhe
        ordem={ordemSelecionada}
        open={modalAberto}
        onClose={() => setModalAberto(false)}
      />

      {/* Novo modal para criação de ordem */}
      <ModalNovaOrdem
        open={novaOrdemAberta}
        dataSelecionada={dataSelecionada}
        onClose={() => setNovaOrdemAberta(false)}
      />

      <style jsx global>{`
        .fc .fc-timegrid-slot {
          height: 80px !important;
        }

        .fc .fc-timegrid-slot-label {
          height: 80px !important;
          line-height: 80px !important;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
}
