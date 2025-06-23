import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";
import { create } from "zustand";

type FuncionarioStore = {
  funcionarios: FuncionarioItf[];
  funcionarioSelecionado: FuncionarioItf | null;
  carregando: boolean;
  listar: () => Promise<void>;
  buscar: (id: number) => Promise<void>;
  criar: (novo: Omit<FuncionarioItf, "id">) => Promise<void>;
  editar: (id: number, dados: Partial<FuncionarioItf>) => Promise<void>;
  excluir: (id: number) => Promise<void>;
  limparSelecionado: () => void;
};

export const useFuncionarios = create<FuncionarioStore>((set) => ({
  funcionarios: [],
  funcionarioSelecionado: null,
  carregando: false,

  listar: async () => {
    set({ carregando: true });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuario`);
      const dados = await res.json();
      set({ funcionarios: dados });
    } catch (err) {
      console.error("Erro ao listar funcionários:", err);
    } finally {
      set({ carregando: false });
    }
  },

  buscar: async (id) => {
    set({ carregando: true });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/usuario/${id}`
      );
      const dados = await res.json();
      set({ funcionarioSelecionado: dados });
    } catch (err) {
      console.error("Erro ao buscar funcionário:", err);
    } finally {
      set({ carregando: false });
    }
  },

  criar: async (novo) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });
      const dados = await res.json();
      set((state) => ({ funcionarios: [...state.funcionarios, dados] }));
    } catch (err) {
      console.error("Erro ao criar funcionário:", err);
    }
  },

  editar: async (id, dados) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL_API}/usuario/${id}/`;
      console.log("Chamando API PATCH:", url);

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) {
        const erroTexto = await res.text();
        console.error("Erro da API:", erroTexto);
        throw new Error(`Erro ${res.status}: ${erroTexto}`);
      }

      const atualizado = await res.json();

      set((state) => ({
        funcionarios: state.funcionarios.map((f) =>
          f.id === id ? atualizado : f
        ),
        funcionarioSelecionado: atualizado,
      }));
    } catch (err) {
      console.error("Erro ao editar funcionário:", err);
    }
  },

  excluir: async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuario/${id}`, {
        method: "DELETE",
      });
      set((state) => ({
        funcionarios: state.funcionarios.filter((f) => f.id !== id),
        funcionarioSelecionado: null,
      }));
    } catch (err) {
      console.error("Erro ao excluir funcionário:", err);
    }
  },

  limparSelecionado: () => set({ funcionarioSelecionado: null }),
}));
