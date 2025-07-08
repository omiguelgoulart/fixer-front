// hooks/usePlanejamento.ts
import { create } from "zustand";
import { UsuarioItf } from "@/app/utils/types/usuarioItf";
import { PlantaItf } from "@/app/utils/types/ativo/PlantaItf";
import { AreaItf } from "@/app/utils/types/ativo/AreaItf";
import { SistemaItf } from "@/app/utils/types/ativo/SistemaItf";
import { AtivoItf } from "@/app/utils/types/ativo/Ativo";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

interface EventoCalendario {
  id: string;
  title: string;
  start: string;
  color: string;
}

interface PlanejamentoState {
  ordens: OrdemServicoItf[];
  manutencoes: EventoCalendario[];
  usuarios: UsuarioItf[];
  plantas: PlantaItf[];
  areas: AreaItf[];
  sistemas: SistemaItf[];
  ativos: AtivoItf[];
  loading: boolean;
  error: string | null;
  fetchOrdens: () => Promise<void>;
  fetchUsuarios: () => Promise<void>;
  fetchPlantas: () => Promise<void>;
  fetchAreas: (idPlanta: number) => Promise<void>;
  fetchSistemas: (idArea: number) => Promise<void>;
  fetchAtivos: (idSistema: number) => Promise<void>;
  editarOrdem: (ordem: OrdemServicoItf) => Promise<void>;
  carregarUsuarios: () => Promise<void>;
  criarTarefa: (tarefa: { descricao: string; ordemServicoId: number }) => Promise<void>;
  criarInsumo: (insumo: { nome: string; quantidade: number; ordemServicoId: number }) => Promise<void>;
  deletarOrdem: (id: number) => Promise<void>;
  novaOrdem: (ordem: OrdemServicoItf) => Promise<void>;
}

export const usePlanejamento = create<PlanejamentoState>((set) => ({
  ordens: [],
  manutencoes: [],
  usuarios: [],
  plantas: [],
  areas: [],
  sistemas: [],
  ativos: [],
  loading: false,
  error: null,

  fetchOrdens: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`);
      const data: OrdemServicoItf[] = await response.json();

      const eventos = data.map((ordem) => ({
        id: ordem.id.toString(),
        title: `${ordem.titulo} - ${ordem.ativo?.nome ?? "Ativo não informado"}`,
        start: ordem.dataInicioPlanejada,
        color:
          ordem.prioridade === "ALTA"
            ? "#f87171"
            : ordem.prioridade === "MEDIA"
            ? "#facc15"
            : "#4ade80",
      }));

      set({ ordens: data, manutencoes: eventos });
    } catch (error) {
      console.error("Erro ao buscar ordens de serviço", error);
      set({ error: "Erro ao carregar ordens de serviço." });
    }
  },

  fetchUsuarios: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuario/tecnico`);
      const data = await response.json();
      set({ usuarios: data });
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
      set({ error: "Erro ao carregar usuários." });
    }
  },

  fetchPlantas: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`);
      const data = await response.json();
      set({ plantas: data });
    } catch (error) {
      console.error("Erro ao carregar plantas", error);
      set({ error: "Erro ao carregar plantas." });
    }
  },

  fetchAreas: async (idPlanta: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta/${idPlanta}`);
      const data = await response.json();
      set({ areas: data.area || [], sistemas: [] });
    } catch (error) {
      console.error("Erro ao carregar áreas da planta", error);
      set({ error: "Erro ao carregar áreas da planta." });
    }
  },

  fetchSistemas: async (idArea: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/area/${idArea}/sistemas`);
      const data = await response.json();
      set({ sistemas: data.sistema || [] });
    } catch (error) {
      console.error("Erro ao carregar sistemas da área", error);
      set({ error: "Erro ao carregar sistemas da área." });
    }
  },

  fetchAtivos: async (idSistema: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/sistema/${idSistema}/ativos`);
      const data = await response.json();
      set({ ativos: data });
    } catch (error) {
      console.error("Erro ao carregar ativos do sistema", error);
      set({ error: "Erro ao carregar ativos do sistema." });
    }
  },

  editarOrdem: async (ordem: OrdemServicoItf) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ordem),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar ordem de serviço");
      }

      await set((state) => ({
        ordens: state.ordens.map((o) => (o.id === ordem.id ? ordem : o)),
      }));
    } catch (error) {
      console.error("Erro ao editar ordem de serviço", error);
      set({ error: "Erro ao editar ordem de serviço." });
    }
  },

    carregarUsuarios: async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuario/tecnico`);
        const data = await response.json();
        set({ usuarios: data });
        } catch (error) {
        console.error("Erro ao carregar usuários", error);
        set({ error: "Erro ao carregar usuários." });
        }
    },

    criarTarefa: async ({ descricao, ordemServicoId }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordemServicoId}/tarefas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ descricao }),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar tarefa");
            }

            const novaTarefa = await response.json();
            set((state) => ({
                ordens: state.ordens.map((ordem) =>
                    ordem.id === ordemServicoId
                        ? { ...ordem, tarefas: [...(ordem.tarefas || []), novaTarefa] }
                        : ordem
                ),
            }));
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
            set({ error: "Erro ao criar tarefa." });
        }
    },

    criarInsumo: async ({ nome, quantidade, ordemServicoId }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${ordemServicoId}/insumos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, quantidade }),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar insumo");
            }

            const novoInsumo = await response.json();
            set((state) => ({
                ordens: state.ordens.map((ordem) =>
                    ordem.id === ordemServicoId
                        ? { ...ordem, insumos: [...(ordem.insumos || []), novoInsumo] }
                        : ordem
                ),
            }));
        } catch (error) {
            console.error("Erro ao criar insumo", error);
            set({ error: "Erro ao criar insumo." });
        }
    },

    deletarOrdem: async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir ordem de serviço");
            }

            set((state) => ({
                ordens: state.ordens.filter((ordem) => ordem.id !== id),
            }));
        } catch (error) {
            console.error("Erro ao excluir ordem de serviço", error);
            set({ error: "Erro ao excluir ordem de serviço." });
        }
    },

    novaOrdem: async (ordem: OrdemServicoItf) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemServico`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ordem),
            });

            if (!response.ok) {
                throw new Error("Erro ao criar nova ordem de serviço");
            }

            const novaOrdem = await response.json();
            set((state) => ({
                ordens: [...state.ordens, novaOrdem],
            }));
        } catch (error) {
            console.error("Erro ao criar nova ordem de serviço", error);
            set({ error: "Erro ao criar nova ordem de serviço." });
        }
    },
}));
