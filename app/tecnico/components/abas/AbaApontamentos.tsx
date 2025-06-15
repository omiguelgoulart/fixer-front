// AbaApontamentos.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AbaApontamentos({ novoApontamento, setNovoApontamento }: {
  novoApontamento: string;
  setNovoApontamento: (v: string) => void;
}) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Apontamentos</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Adicionar Observação</label>
          <Textarea placeholder="Descreva observações, problemas encontrados ou ações realizadas..." value={novoApontamento} onChange={(e) => setNovoApontamento(e.target.value)} rows={4} />
          <Button className="mt-2 w-full" disabled={!novoApontamento.trim()}>Salvar Apontamento</Button>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Histórico de Apontamentos</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-900">João Silva</span>
                <span className="text-xs text-gray-500">Hoje, 14:30</span>
              </div>
              <p className="text-sm text-gray-700">Equipamento apresentando ruído anormal. Verificar rolamentos.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
