import { Suspense } from "react"
import Carregando from "@/app/components/carregando"
import GerenciamentoFuncionarios from "./components/GerenciamentoFuncionarios"

export default async function PaginaFuncionarios() {
  return (
    <div className="flex flex-col min-h-full bg-blue-50">
      <main className="flex-1 container mx-auto p-4">
        <Suspense fallback={<Carregando />}>
          <GerenciamentoFuncionarios />
        </Suspense>
      </main>
    </div>
  )
}
