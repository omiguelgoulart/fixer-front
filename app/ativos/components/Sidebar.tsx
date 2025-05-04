import { Search } from "lucide-react"
import ArvoreAtivos from "./ArvoreAtivo"
import CaixaPesquisa from "./BarraPesquisa"

// Componente Server para a barra lateral
export default function BarraLateral() {
  return (
    <aside className="w-64 bg-blue-50 p-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Sistema CMMS</h2>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <CaixaPesquisa />
      </div>
      <ArvoreAtivos />
    </aside>
  )
}
