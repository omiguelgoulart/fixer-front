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
    <div className="flex min-h-full bg-blue-50">
      {/* Sidebar */}
      <div className="w-full md:w-95 md:shrink-0 ">
        <Sidebar onSelecionarAtivo={irParaDetalhes} />
      </div>


      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto p-4">
        <Suspense fallback={<div className="p-8">Carregando...</div>}>
          {!ativoSelecionado && (
            <CardAtivo onAbrirCadastro={() => setMostrarModalCadastro(true)} />
          )}
          {ativoSelecionado !== null && (
            <DetalhesAtivo ativoId={ativoSelecionado} onVoltar={voltarInicio} />
          )}
        </Suspense>
      </main>

      {/* Modal de Cadastro */}
      <ModalCadastroEntidades
        aberto={mostrarModalCadastro}
        aoFechar={() => setMostrarModalCadastro(false)}
      />
    </div>
    
  )
}
