"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";

import OrdemHeader from "../../components/OrdemHeader";
import OrdemInfo from "../../components/OrdemInfo";
import OrdemTabs from "../../components/OrdemTabs";
import OrdemFooterActions from "../../components/OrdemFooterActions";

export default function OrdemDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [ordem, setOrdem] = useState<OrdemServicoItf | null>(null);
  const [loading, setLoading] = useState(true);

  const [novoApontamento, setNovoApontamento] = useState("");
  const [tarefasConcluidas, setTarefasConcluidas] = useState<number[]>([]);

  useEffect(() => {
    async function fetchDetalhe() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${params.id}/os`);
        const dados: OrdemServicoItf = await res.json();
        setOrdem(dados);
      } catch {
        console.error("Erro ao carregar detalhes");
      } finally {
        setLoading(false);
      }
    }
    fetchDetalhe();
  }, [params.id]);

  if (loading) return <p>Carregando...</p>;
  if (!ordem) return <p>Ordem não encontrada.</p>;

  const toggleTarefa = (id: number) =>
    setTarefasConcluidas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <OrdemHeader ordem={ordem} onVoltar={() => router.push("/tecnico")} />
      <div className="p-4 max-w-4xl mx-auto">
        <OrdemInfo ordem={ordem} />
        <OrdemTabs
          ordem={ordem}
          tarefasConcluidas={tarefasConcluidas}
          toggleTarefa={toggleTarefa}
          novoApontamento={novoApontamento}
          setNovoApontamento={setNovoApontamento}
          onUpdateOrdem={setOrdem}
        />
        <OrdemFooterActions />
      </div>
    </div>
  );
}
