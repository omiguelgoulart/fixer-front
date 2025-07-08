import { FuncionarioItf } from "@/app/utils/types/FuncionarioItf";
import { create } from "zustand";
import { toast } from "sonner";

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
      toast.error("Erro ao listar funcionários.");
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
      toast.success("Funcionário carregado com sucesso!");
    } catch (err) {
      console.error("Erro ao buscar funcionário:", err);
      toast.error("Erro ao buscar funcionário.");
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
      toast.success("Funcionário criado com sucesso!");
    } catch (err) {
      console.error("Erro ao criar funcionário:", err);
      toast.error("Erro ao criar funcionário.");
    }
  },

  editar: async (id, dados) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL_API}/usuario/${id}`;
      console.log("Chamando API PATCH:", url);

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!res.ok) {
        const erroTexto = await res.text();
        console.error("Erro da API:", erroTexto);
        toast.error(`Erro ao editar funcionário: ${erroTexto}`);
        throw new Error(`Erro ${res.status}: ${erroTexto}`);
      }

      const atualizado = await res.json();

      set((state) => ({
        funcionarios: state.funcionarios.map((f) =>
          f.id === id ? atualizado : f
        ),
        funcionarioSelecionado: atualizado,
      }));
      toast.success("Funcionário editado com sucesso!");
    } catch (err) {
      console.error("Erro ao editar funcionário:", err);
      if (!(err instanceof Error) || !err.message?.includes("Erro ao editar funcionário:")) {
        toast.error("Erro ao editar funcionário.");
      }
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
      toast.success("Funcionário excluído com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir funcionário:", err);
      toast.error("Erro ao excluir funcionário.");
    }
  },

  limparSelecionado: () => set({ funcionarioSelecionado: null }),
}));
