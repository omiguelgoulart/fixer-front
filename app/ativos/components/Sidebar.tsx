import { Search } from "lucide-react";
import ArvoreAtivos from "./ArvoreAtivo";
import CaixaPesquisa from "./BarraPesquisa";

export default function Sidebar({
  onSelecionarAtivo,
}: {
  onSelecionarAtivo: (id: number) => void;
}) {
  return (
    <div className="bg-white border rounded-lg m-4 p-4 h-[calc(90vh-3rem)] overflow-y-auto shadow-sm">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <CaixaPesquisa />
      </div>
      <ArvoreAtivos onSelecionarAtivo={onSelecionarAtivo} />
    </div>
  );
}
