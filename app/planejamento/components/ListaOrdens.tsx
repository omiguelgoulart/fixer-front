'use client'

import { OrdemServicoItf } from "@/app/utils/types/planejamento/OSItf"
import { cn } from "@/lib/utils"

// 1. A interface de Props foi atualizada para receber os dados do componente pai
interface ListaOrdensProps {
  ordensDeServico: OrdemServicoItf[];
  onSelect: (ordem: OrdemServicoItf) => void;
  ordemSelecionadaId?: number | null; // Pode ser null ou undefined
}

// 2. A assinatura da função agora aceita as novas props
export default function ListaOrdens({ ordensDeServico, onSelect, ordemSelecionadaId }: ListaOrdensProps) {
  
  // 3. REMOVEMOS a busca de dados e os estados internos 'useState' para ordens e carregando.
  //    O componente agora é mais simples e apenas renderiza o que recebe.

<<<<<<< HEAD
  // Carrega as ordens de serviço ao montar o componente
  // e armazena no estado ordensServico
  useEffect(() => {
    async function fetchOrdemServico() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico`)
        const dados = await response.json()
        setOrdensServico(dados)
      } catch {
        console.error("Erro ao carregar OrdemServico")
      } finally {
        setCarregando(false)
      }
    }
    fetchOrdemServico()
 }, []);

  // Função para selecionar uma ordem e carregar seus detalhes
  // e chamar a função onSelect com os dados da ordem
  async function selecionarOrdem(id: number) {
    setOrdemSelecionadaId(id)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/ordemservico/${id}/os`)
      const dados = await response.json()
      onSelect(dados)
    } catch (error) {
      console.error("Erro ao carregar detalhes da ordem", error)
    }
  }

  if (carregando) {
    return <div className="p-4 text-gray-500">Carregando ordens...</div>
=======
  // Adicionamos um estado para o caso de a lista de ordens estar vazia
  if (ordensDeServico.length === 0) {
    return <div className="p-4 text-center text-sm text-gray-500">Nenhuma ordem de serviço encontrada.</div>
>>>>>>> feat/pagina-planejamento
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 4. O .map() agora usa a prop 'ordensDeServico' vinda do pai */}
      {ordensDeServico.map((ordem) => (
      <li
        key={ordem.id}
        // 5. O onClick agora chama 'onSelect' diretamente com o objeto 'ordem' clicado.
        //    Não é mais necessário buscar os detalhes aqui, pois o pai gerencia a seleção.
        onClick={() => onSelect(ordem)}
        className={cn(
          "p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800",
          // A lógica para destacar o item selecionado agora usa a prop 'ordemSelecionadaId'
          ordemSelecionadaId === ordem.id && "bg-blue-50 dark:bg-blue-900/50"
        )}
      >
        <div className="font-medium text-sm flex items-center gap-2">
          {/* O restante do JSX permanece o mesmo, usando o objeto 'ordem' do map */}
          <span className="text-xs text-gray-400">{ordem.codigo}</span>
          <span>{ordem.titulo}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300">
            {ordem.status
              ? ordem.status.replace("_", " ").toLowerCase()
              : "Em aberto"}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-white font-semibold",
              ordem.prioridade === "ALTA" && "bg-red-500",
              ordem.prioridade === "MEDIA" && "bg-yellow-500",
              ordem.prioridade === "BAIXA" && "bg-green-500"
            )}
          >
            {ordem.prioridade}
          </span>
        </div>
      </li>
      ))}
    </ul>
  )
}