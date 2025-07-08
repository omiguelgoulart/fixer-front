"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";

interface AuthContextType {
  usuario: FuncionarioItf | null;
  logarUsuario: (usuario: FuncionarioItf) => void;
  deslogarUsuario: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<FuncionarioItf | null>(null);

  useEffect(() => {
    const cookie = Cookies.get("usuario");
    if (cookie) {
      try {
        const usuarioParse: FuncionarioItf = JSON.parse(cookie);
        setUsuario(usuarioParse);
      } catch {
        setUsuario(null);
      }
    }
  }, []);

  const logarUsuario = (usuarioLogado: FuncionarioItf) => {
    setUsuario(usuarioLogado);
    Cookies.set("usuario", JSON.stringify(usuarioLogado), { expires: 1 }); // expira em 1 dia
  };

  const deslogarUsuario = () => {
    setUsuario(null);
    Cookies.remove("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, logarUsuario, deslogarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
