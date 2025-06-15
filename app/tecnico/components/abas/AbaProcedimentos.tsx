// AbaProcedimentos.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AbaProcedimentos() {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Procedimentos</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Procedimento Padrão</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Verificar se o equipamento está desligado</li>
              <li>Realizar inspeção visual</li>
              <li>Executar as tarefas listadas</li>
              <li>Testar funcionamento</li>
              <li>Registrar observações</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
