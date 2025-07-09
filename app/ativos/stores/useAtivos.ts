// hooks/useAtivos.ts
import { create } from "zustand";
import type { PlantaItf } from "@/app/utils/types/ativo/PlantaItf";
import type { AreaItf } from "@/app/utils/types/ativo/AreaItf";
import type { SistemaItf } from "@/app/utils/types/ativo/SistemaItf";
import type { AtivoItf } from "@/app/utils/types/ativo/Ativo";
import type { SubAtivoItf } from "@/app/utils/types/ativo/SubAtivoItf";

interface AtivosState {
  plantas: PlantaItf[];
  areas: AreaItf[];
  sistemas: SistemaItf[];
  ativos: AtivoItf[];
  subativos: SubAtivoItf[];
  ativoSelecionado?: AtivoItf;
  carregando: boolean;
  carregarPlantas: () => Promise<void>;
  carregarAreas: () => Promise<void>;
  carregarSistemas: () => Promise<void>;
  carregarAtivos: () => Promise<void>;
  carregarSubativos: () => Promise<void>;
  cadastrarPlanta: (data: PlantaItf) => Promise<boolean>;
  cadastrarArea: (data: AreaItf) => Promise<boolean>;
  cadastrarSistema: (data: SistemaItf) => Promise<boolean>;
  cadastrarAtivo: (data: AtivoItf) => Promise<boolean>;
  cadastrarSubativo: (data: SubAtivoItf) => Promise<boolean>;
  carregarAreasPorPlanta: (id_planta: number) => Promise<void>;
  carregarSistemasPorArea: (id_area: number) => Promise<void>;
  carregarAtivosPorSistema: (id_sistema: number) => Promise<void>;
  carregarAtivoPorId: (id: number) => Promise<void>;
  excluirAtivo: (id: number) => Promise<void>;
  carregarSubAtivoPorId: (id: number) => Promise<void>;
  excluirSubAtivo: (id: number) => Promise<void>;
  carregarSubAtivosPorAtivo: (id_ativo: number) => Promise<void>;
  atualizarAtivo: () => Promise<void>;
  editarAtivo: (ativo: AtivoItf) => Promise<void>;
  editarPlanta: (planta: PlantaItf) => Promise<void>;
  editarArea: (area: AreaItf) => Promise<void>;
  editarSistema: (sistema: SistemaItf) => Promise<void>;
  excluirPlanta: (id: number) => Promise<void>;
  excluirArea: (id: number) => Promise<void>;
  excluirSistema: (id: number) => Promise<void>;
  error: string;
  limparErro: () => void;
}

export const useAtivos = create<AtivosState>((set, get) => ({
  plantas: [],
  areas: [],
  sistemas: [],
  ativos: [],
  subativos: [],

  carregarPlantas: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`);
    const data = await res.json();
    set({ plantas: data });
  },

  carregarAreas: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/area`);
    const data = await res.json();
    set({ areas: data });
  },

  carregarSistemas: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/sistema`);
    const data = await res.json();
    set({ sistemas: data });
  },

  carregarAtivos: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ativo`);
    const data = await res.json();
    set({ ativos: data });
  },

  carregarSubativos: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/subativo`);
    const data = await res.json();
    set({ subativos: data });
  },

  cadastrarPlanta: async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  cadastrarArea: async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/area`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  cadastrarSistema: async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/sistema`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  cadastrarAtivo: async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ativo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  cadastrarSubativo: async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/subativo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  },

  carregarAreasPorPlanta: async (id_planta) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/planta/${id_planta}`
      );
      const data = await response.json();
      set({ areas: data.area || [], sistemas: [] }); // Limpa sistemas ao mudar planta
    } catch (error) {
      console.error("Erro ao carregar áreas:", error);
    }
  },

  carregarSistemasPorArea: async (id_area) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/area/${id_area}/sistemas`
      );
      const data = await response.json();
      set({ sistemas: data.sistema || [] });
    } catch (error) {
      console.error("Erro ao carregar sistemas:", error);
    }
  },

  carregarAtivosPorSistema: async (id_sistema) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/sistema/${id_sistema}/ativos`
      );
      const data = await response.json();
      set({ ativos: data.ativo || [] });
    } catch (error) {
      console.error("Erro ao carregar ativos:", error);
    }
  },

  carregarAtivoPorId: async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ativo/${id}`
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar ativo");
      }
      const data = await response.json();
      set({ ativoSelecionado: data });
    } catch (error) {
      console.error("Erro ao carregar ativo por ID:", error);
      set({ error: "Erro ao carregar ativo" });
    }
  },

  excluirAtivo: async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ativo/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao excluir ativo");
      }
      set((state) => ({
        ativos: state.ativos.filter((ativo) => ativo.id !== id),
        ativoSelecionado: undefined,
      }));
    } catch (error) {
      console.error("Erro ao excluir ativo:", error);
      set({ error: "Erro ao excluir ativo" });
    }
  },

  carregarSubAtivoPorId: async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/subativo/${id}`
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar subativo");
      }
      const data = await response.json();
      set({ subativos: [data] });
    } catch (error) {
      console.error("Erro ao carregar subativo por ID:", error);
      set({ error: "Erro ao carregar subativo" });
    }
  },

  excluirSubAtivo: async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/subativo/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao excluir subativo");
      }
      set((state) => ({
        subativos: state.subativos.filter((subativo) => subativo.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir subativo:", error);
      set({ error: "Erro ao excluir subativo" });
    }
  },

  carregarSubAtivosPorAtivo: async (id_ativo) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ativo/${id_ativo}/subativos`
      );
      if (!response.ok) {
        throw new Error("Erro ao carregar subativos");
      }
      const data = await response.json();
      set({ subativos: data.subativo || [] });
    } catch (error) {
      console.error("Erro ao carregar subativos por ativo:", error);
      set({ error: "Erro ao carregar subativos" });
    }
  },

  atualizarAtivo: async () => {
    const { ativoSelecionado } = get();
    if (!ativoSelecionado) {
      set({ error: "Nenhum ativo selecionado para atualizar" });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativoSelecionado.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ativoSelecionado),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar ativo");
      }
      const updatedAtivo = await response.json();
      set({ ativoSelecionado: updatedAtivo });
    } catch (error) {
      console.error("Erro ao atualizar ativo:", error);
      set({ error: "Erro ao atualizar ativo" });
    }
  },

editarPlanta: async (planta) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/planta/${planta.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planta),
      }
    );
    if (!response.ok) throw new Error("Erro ao editar planta");

    const updatedPlanta = await response.json();
    set((state) => ({
      plantas: state.plantas.map((p) =>
        p.id === updatedPlanta.id ? updatedPlanta : p
      ),
    }));
  } catch (error) {
    console.error("Erro ao editar planta:", error);
    set({ error: "Erro ao editar planta" });
  }
},

editarArea: async (area) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/area/${area.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(area),
      }
    );
    if (!response.ok) throw new Error("Erro ao editar área");

    const updatedArea = await response.json();
    set((state) => ({
      areas: state.areas.map((a) =>
        a.id === updatedArea.id ? updatedArea : a
      ),
    }));
  } catch (error) {
    console.error("Erro ao editar área:", error);
    set({ error: "Erro ao editar área" });
  }
},

editarSistema: async (sistema) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/sistema/${sistema.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sistema),
      }
    );
    if (!response.ok) throw new Error("Erro ao editar sistema");

    const updatedSistema = await response.json();
    set((state) => ({
      sistemas: state.sistemas.map((s) =>
        s.id === updatedSistema.id ? updatedSistema : s
      ),
    }));
  } catch (error) {
    console.error("Erro ao editar sistema:", error);
    set({ error: "Erro ao editar sistema" });
  }
},

  excluirPlanta: async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir planta");
      }
      set((state) => ({
        plantas: state.plantas.filter((planta) => planta.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir planta:", error);
      set({ error: "Erro ao excluir planta" });
    }
  },

  excluirArea: async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/area/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir área");
      }
      set((state) => ({
        areas: state.areas.filter((area) => area.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir área:", error);
      set({ error: "Erro ao excluir área" });
    }
  },

  excluirSistema: async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/sistema/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir sistema");
      }
      set((state) => ({
        sistemas: state.sistemas.filter((sistema) => sistema.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao excluir sistema:", error);
      set({ error: "Erro ao excluir sistema" });
    }
  },

editarAtivo: async (ativo) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/ativo/${ativo.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ativo),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao editar ativo");
    }

    const updatedAtivo = await response.json();

    set((state) => ({
      ativos: state.ativos.map((a) =>
        a.id === updatedAtivo.id ? updatedAtivo : a
      ),
      ativoSelecionado: updatedAtivo,
    }));
  } catch (error) {
    console.error("Erro ao editar ativo:", error);
    set({ error: "Erro ao editar ativo" });
  }
},

  carregando: false,

  error: "",
  limparErro: () => set({ error: "" }),
}));
