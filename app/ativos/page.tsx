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
    // ALTERAÇÃO 1: O padrão agora é flex-col (mobile), mudando para flex-row em telas médias (md) ou maiores
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* ALTERAÇÃO 2: A sidebar ocupa a largura total em telas pequenas e a largura fixa em telas maiores */}
      <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 p-2 md:p-0 md:h-auto md:overflow-y-auto">
        <Sidebar onSelecionarAtivo={irParaDetalhes} />
      </div>

      {/* O conteúdo principal se adaptará automaticamente */}
      <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900/50 overflow-y-auto">
        <Suspense fallback={<div className="p-8">Carregando...</div>}>
          {!ativoSelecionado && (
            <CardAtivo onAbrirCadastro={() => setMostrarModalCadastro(true)} />
          )}
          {ativoSelecionado !== null && (
            <DetalhesAtivo ativoId={ativoSelecionado} onVoltar={voltarInicio} />
          )}
        </Suspense>
      </main>

      {/* O Modal não precisa de alterações */}
      <ModalCadastroEntidades
        aberto={mostrarModalCadastro}
        aoFechar={() => setMostrarModalCadastro(false)}
      />
    </div>
  )
}