import { create } from "zustand";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { ObservacaoItf } from "@/app/utils/types/planejamento/ObservacaoItf";
import { toast } from "sonner";

interface TecnicoState {
  ordens: OrdemServicoItf[];
  observacoes: ObservacaoItf[];
  carregando: boolean;
  buscarOrdens: (tecnicoId: number) => Promise<void>;
  adicionarObservacao: (
    ordemId: number,
    texto: string,
    responsavelId: number
  ) => Promise<void>;
  atualizarOrdem: (novaOrdem: OrdemServicoItf) => void;
  buscarOrdemPorId: (id: number) => Promise<OrdemServicoItf | null>;
  removerObservacao: (ordemId: number, observacaoId: number) => Promise<void>;
}

export const useTecnico = create<TecnicoState>((set) => ({
  ordens: [],
  observacoes: [],
  carregando: false,

  async buscarOrdens(tecnicoId: number) {
    set({ carregando: true });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/usuario/tecnico/${tecnicoId}/tec`
      );
      if (!res.ok) throw new Error("Erro ao buscar ordens");
      const data: OrdemServicoItf[] = await res.json();
      set({ ordens: data });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar ordens");
    } finally {
      set({ carregando: false });
    }
  },

  async buscarObservacoes(ordemId: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/observacoes?ordemServicoId=${ordemId}`
      );
      if (!res.ok) throw new Error("Erro ao buscar observações");
      const data: ObservacaoItf[] = await res.json();
      set({ observacoes: data });
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar observações");
    }
  },

  async adicionarObservacao(ordemId, texto, responsavelId) {
    if (!texto.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/observacao`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ordemServicoId: ordemId,
            texto,
            resposavelId: responsavelId, // 👈 aqui o nome deve ser 'resposavel'
          }),
        }
      );

      if (!res.ok) throw new Error("Erro ao adicionar apontamento");
      const nova: ObservacaoItf = await res.json();

      set((state) => ({
        observacoes: [nova, ...state.observacoes],
      }));

      toast.success("Apontamento adicionado!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao adicionar apontamento");
    }
  },

  async buscarOrdemPorId(id: number) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${id}/os`
      );
      if (!res.ok) throw new Error("Erro ao buscar ordem");
      const ordem: OrdemServicoItf = await res.json();
      return ordem;
    } catch (err) {
      console.error(err);
      toast.error("Erro ao buscar OS atualizada");
      return null;
    }
  },
  
  async removerObservacao(ordemId: number, observacaoId: number) {
    if (!confirm("Deseja realmente excluir este apontamento?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/observacao/${observacaoId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Erro ao remover apontamento");

      set((state) => ({
        observacoes: state.observacoes.filter(
          (obs) => obs.id !== observacaoId
        ),
      }));

      toast.success("Apontamento removido com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao remover apontamento");
    }
  },

  atualizarOrdem(novaOrdem) {
    set((state) => ({
      ordens: state.ordens.map((ordem) =>
        ordem.id === novaOrdem.id ? novaOrdem : ordem
      ),
    }));
  },
}));
