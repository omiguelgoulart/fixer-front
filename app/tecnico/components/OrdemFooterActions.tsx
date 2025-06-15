// components/OrdemFooterActions.tsx
import { Button } from "@/components/ui/button";

export default function OrdemFooterActions() {
  return (
    <div className="sticky bottom-4 mt-6">
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-12">
          Pausar Ordem
        </Button>
        <Button className="flex-1 h-12 bg-green-600 hover:bg-green-700">
          Concluir Ordem
        </Button>
      </div>
    </div>
  );
}
