"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import Cookies from "js-cookie"
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
    const usuarioCookie = Cookies.get("usuario")
    if (usuarioCookie) {
      try {
        const usuarioParse: FuncionarioItf = JSON.parse(usuarioCookie)
        setUsuario(usuarioParse)
      } catch {
        setUsuario(null)
      }
    }
  }, [])

  const logarUsuario = (usuarioLogado: FuncionarioItf) => {
    setUsuario(usuarioLogado)
    Cookies.set("usuario", JSON.stringify(usuarioLogado), { expires: 7 }) // expira em 7 dias
  }

  const deslogarUsuario = () => {
    setUsuario(null)
    Cookies.remove("usuario")
    Cookies.remove("token")
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
