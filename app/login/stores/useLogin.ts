import { create } from "zustand"
import { toast } from "sonner"
import Cookies from "js-cookie"
import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf"

type LoginState = {
  login: (
    email: string,
    senha: string,
    logarUsuario: (usuario: FuncionarioItf) => void
  ) => Promise<FuncionarioItf | null>;
  enviarCodigoRecuperacao: (email: string) => Promise<boolean>;
  redefinirSenha: (params: {
    email: string;
    codigoRecuperacao: string;
    novaSenha: string;
    confirmacaoNovaSenha: string;
  }) => Promise<boolean>;
};

export const useLogin = create<LoginState>(() => ({
  login: async (email, senha, logarUsuario) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("token", data.token, { expires: 7 }); // cookie com validade de 7 dias
        logarUsuario(data.usuario);
        toast.success("Login realizado!");
        return data.usuario;
      } else if (res.status === 401) {
        toast.error("Email ou senha inválidos");
      } else {
        toast.error(data.message || "Erro ao fazer login");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error(error);
    }

    return null;
  },

  enviarCodigoRecuperacao: async (email) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/esqueci-senha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(data.message || "Solicitação enviada com sucesso!");
        return true;
      } else {
        toast.error(data?.detalhes?.email?.[0] || data.erro || "Erro ao enviar código.");
        return false;
      }
    } catch {
      toast.error("Erro ao conectar com o servidor.");
      return false;
    }
  },

  redefinirSenha: async ({
    email,
    codigoRecuperacao,
    novaSenha,
    confirmacaoNovaSenha,
  }) => {
    try {
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/auth/recuperar-senha`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          codigoRecuperacao,
          novaSenha,
          confirmacaoNovaSenha,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success(data.message || "Senha redefinida com sucesso!");
        return true;
      } else {
        toast.error(
          data.erro ||
            (data.detalhes
              ? Object.values(data.detalhes).flat().join(" ")
              : "Erro ao redefinir a senha.")
        );
        return false;
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error("Erro redefinirSenha:", error);
      return false;
    }
  },
}));
