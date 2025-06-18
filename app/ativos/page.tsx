"use client"

import { useState, Suspense } from "react"
import Sidebar from "./components/Sidebar"
import CardAtivo from "./components/CardAtivo"
import DetalhesAtivo from "./components/DetalheAtivo"
import ModalCadastroEntidades from "./components/Cadastro"

export default function PaginaAtivos() {
  const [ativoSelecionado, setAtivoSelecionado] = useState<number | null>(null)
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false)

  const irParaDetalhes = (id: number) => setAtivoSelecionado(id)
  const voltarInicio = () => setAtivoSelecionado(null)

  return (
<div className="flex flex-col md:flex-row bg-blue-50 min-h-screen">
  <div className="w-full md:w-96 shrink-0 border-b md:border-b-0  p-2 md:p-0 md:h-auto md:overflow-y-auto">
    <Sidebar onSelecionarAtivo={irParaDetalhes} />
  </div>

  <main className="flex-1 p-4 overflow-y-auto">
    <Suspense fallback={<div className="p-8">Carregando...</div>}>
      {!ativoSelecionado && (
        <CardAtivo onAbrirCadastro={() => setMostrarModalCadastro(true)} />
      )}
      {ativoSelecionado !== null && (
        <DetalhesAtivo ativoId={ativoSelecionado} onVoltar={voltarInicio} />
      )}
    </Suspense>
  </main>

  <ModalCadastroEntidades
    aberto={mostrarModalCadastro}
    aoFechar={() => setMostrarModalCadastro(false)}
  />
</div>

    
  )
}