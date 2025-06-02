export interface Tarefa {
  id: number
  descricao: string
}

export interface Insumo {
  id: number
  nome: string
  codigo: string
  quantidade: string
}

export interface OrdemServico {
  id: number
  titulo: string
  status: string
  prioridade: string
  responsavelId: string
  responsavel: string
  ativo: string
  localizacaoId: string
  localizacao: string
  dataInicioPlanejada: string
  dataVencimento: string
  tipoManutencao: string
  tarefas?: Tarefa[]
  insumos?: Insumo[]
}
