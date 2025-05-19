export type StatusOrdem = "Em aberto" | "Concluída"
export type PrioridadeOrdem = "Alta" | "Média" | "Baixa"

export interface OrdemServicoItf {
  id: number
  titulo: string
  status: StatusOrdem
  prioridade: PrioridadeOrdem
  responsavelId: string
  responsavel: string
  ativo: string
  localizacaoId: string
  localizacao: string
  dataInicioPlanejada: string
  dataVencimento: string
  tipoManutencao: string
  executores?: string[]
}

export interface OpcoesFiltro {
  busca?: string
  status?: StatusOrdem
  prioridade?: PrioridadeOrdem
  responsavel?: string
  periodoData?: {
    inicio: Date
    fim: Date
  }
}

export interface Tarefa {
  id: number
  descricao: string
  concluida: boolean
}

export interface Insumo {
  id: number
  nome: string
  codigo: string
  quantidade: string
}

export interface OpcoesFiltro {
  busca?: string
  status?: StatusOrdem
  prioridade?: PrioridadeOrdem
  responsavel?: string
  periodoData?: {
    inicio: Date
    fim: Date
  }
}