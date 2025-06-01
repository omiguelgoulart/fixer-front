import { Suspense } from "react"
import Cabecalho from "@/components/Cabecalho"
import GerenciamentoFuncionarios from "@/components/funcionarios/GerenciamentoFuncionarios"
import Carregando from "@/components/Carregando"

export default async function PaginaFuncionarios() {
  return (
    <div className="flex flex-col min-h-screen">
      <Cabecalho />
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Funcionários</h1>

        <Suspense fallback={<Carregando />}>
          <GerenciamentoFuncionarios />
        </Suspense>
      </main>
    </div>
  )
}
