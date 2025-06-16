import { Suspense } from "react";
// O import 'dynamic' e a definição de 'DashboardPrincipal' foram REMOVIDOS daqui
import DashboardLoader from "@/app/dashboard/components/DashboardLoader"; // <-- Importamos nosso novo componente

// Função para buscar os dados no servidor (continua a mesma)
async function getDashboardData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/dashboard/stats`,
      {
        cache: "no-store", // Garantimos que sempre busque os dados mais recentes
      }
    );
    if (!response.ok) {
      throw new Error(`Falha ao buscar dados: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Erro no fetch do dashboard:", error);
    return null;
  }
}

export default async function PaginaDashboard() {
  const data = await getDashboardData();

  return (
    <main className="flex-1 p-4 md:p-8">
      <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
        {/* Agora renderizamos o DashboardLoader, que cuidará do carregamento dinâmico no cliente */}
        <DashboardLoader initialData={data} />
      </Suspense>
    </main>
  );
}
