"use client";

import { useState, useEffect } from "react";
import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { ObservacaoItf } from "@/app/utils/types/planejamento/ObservacaoItf";

interface Props {
  ordem: OrdemServicoItf;
  onUpdate?: (novaOrdem: OrdemServicoItf) => void;
}

export default function AbaApontamentos({ ordem, onUpdate }: Props) {
  const [novo, setNovo] = useState("");
  const [obs, setObs] = useState<ObservacaoItf[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/observacoes?ordemServicoId=${ordem.id}`);
      if (res.ok) setObs(await res.json());
      else toast.error("Erro ao carregar observações");
    }
    load();
  }, [ordem.id]);

  async function handleSalvar() {
    if (!novo.trim()) return;
    setLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/observacoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ordemServicoId: ordem.id, texto: novo }),
    });
    if (res.ok) {
      const saved: ObservacaoItf = await res.json();
      setObs(prev => [saved, ...prev]);
      setNovo("");
      toast.success("Apontamento adicionado!");
      if (onUpdate) {
        const refreshed = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${ordem.id}/os`);
        const d: OrdemServicoItf = await refreshed.json();
        onUpdate(d);
      }
    } else {
      toast.error("Erro ao adicionar apontamento");
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Apontamentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar Observação</label>
          <Textarea
            placeholder="Descreva observações..."
            value={novo}
            onChange={e => setNovo(e.target.value)}
            rows={4}
          />
          <Button className="mt-2 w-full" onClick={handleSalvar} disabled={loading || !novo.trim()}>
            {loading ? "Salvando..." : "Salvar Apontamento"}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Histórico</h4>
          <div className="space-y-3">
            {obs.length > 0 ? (
              obs.map(o => (
                <div key={o.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-800">
                      {o.responsavel.nome}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(o.criadoEm).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{o.texto}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhum apontamento cadastrado.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
