"use client"

import type React from "react"

import { useState } from "react"

// Componente Client para a caixa de pesquisa
export default function CaixaPesquisa() {
  const [termoPesquisa, setTermoPesquisa] = useState("")

  const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Buscar Ativos..."
      className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={termoPesquisa}
      onChange={handlePesquisa}
    />
  )
}
