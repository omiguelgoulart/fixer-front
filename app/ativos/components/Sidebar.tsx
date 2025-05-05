import { Search } from "lucide-react";
import ArvoreAtivos from "./ArvoreAtivo";
import CaixaPesquisa from "./BarraPesquisa";

export default function Sidebar({
  onSelecionarAtivo,
}: {
  onSelecionarAtivo: (id: number) => void;
}) {
  return (
    // <div className="border border-gray-300 rounded-lg overflow-hidden">
      <aside className=" bg-blue-50 p-4 h-[100%] border-gray-300">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <CaixaPesquisa />
        </div>
        <ArvoreAtivos onSelecionarAtivo={onSelecionarAtivo} />
      </aside>
    // </div>
  );
}
