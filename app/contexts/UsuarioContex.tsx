// contexts/UsuarioContext.tsx
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf"

interface UsuarioContextType {
  usuario: FuncionarioItf | null
  logarUsuario: (usuario: FuncionarioItf) => void
  deslogarUsuario: () => void
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined)

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<FuncionarioItf | null>(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario")
    if (usuarioSalvo) {
      try {
        const usuarioParse: FuncionarioItf = JSON.parse(usuarioSalvo)
        setUsuario(usuarioParse)
      } catch {
        setUsuario(null)
      }
    }
  }, [])

  const logarUsuario = (usuarioLogado: FuncionarioItf) => {
    setUsuario(usuarioLogado)
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado))
  }

  const deslogarUsuario = () => {
    setUsuario(null)
    localStorage.removeItem("usuario")
  }

  return (
    <UsuarioContext.Provider value={{ usuario, logarUsuario, deslogarUsuario }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export const useUsuario = () => {
  const context = useContext(UsuarioContext)
  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de UsuarioProvider")
  }
  return context
}
