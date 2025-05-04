"use client"

import { PlusCircle } from "lucide-react"
import { useState } from "react"

// Componente Client para o botão de novo ativo
export default function BotaoNovoAtivo() {
  const [carregando, setCarregando] = useState(false)

  const handleClick = async () => {
    setCarregando(true)
    // Simulando uma ação que poderia abrir um modal ou redirecionar
    try {
      // Lógica para criar novo ativo
      console.log("Criando novo ativo...")
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.location.href = "/ativos/novo"
    } catch (erro) {
      console.error("Erro ao criar novo ativo", erro)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={carregando}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center transition-colors"
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      {carregando ? "Processando..." : "Novo Ativo"}
    </button>
  )
}
