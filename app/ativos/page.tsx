"use client"

import { useState, Suspense } from "react"
import Sidebar from "./components/Sidebar"
import CardAtivo from "./components/CardAtivo"
import DetalhesAtivo from "./components/DetalheAtivo"
import ModalCadastroEntidades from "./components/Cadastro" // aqui está o modal

export default function PaginaAtivos() {
  const [ativoSelecionado, setAtivoSelecionado] = useState<number | null>(null)
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false)

  const irParaDetalhes = (id: number) => setAtivoSelecionado(id)
  const voltarInicio = () => setAtivoSelecionado(null)

  return (
    <div className="flex min-h-full overflow-hidden">
      <div className="w-80 shrink-0 border-r border-gray-200 h-full overflow-y-auto">
        <Sidebar onSelecionarAtivo={irParaDetalhes} />
      </div>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <Suspense fallback={<div className="p-8">Carregando...</div>}>
          {!ativoSelecionado && (
            <CardAtivo onAbrirCadastro={() => setMostrarModalCadastro(true)} />
          )}
          {ativoSelecionado !== null && (
            <DetalhesAtivo ativoId={ativoSelecionado} onVoltar={voltarInicio} />
          )}
        </Suspense>
      </main>

      {/* Modal de Cadastro de Entidades */}
      <ModalCadastroEntidades
        aberto={mostrarModalCadastro}
        aoFechar={() => setMostrarModalCadastro(false)}
      />
    </div>
  )
}
