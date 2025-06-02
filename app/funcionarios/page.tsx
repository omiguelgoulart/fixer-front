import { Suspense } from "react"
import Carregando from "@/app/components/carregando"
import GerenciamentoFuncionarios from "./components/GerenciamentoFuncionarios"

export default async function PaginaFuncionarios() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Funcionários</h1>

        <Suspense fallback={<Carregando />}>
          <GerenciamentoFuncionarios />
        </Suspense>
      </main>
    </div>
  )
}
