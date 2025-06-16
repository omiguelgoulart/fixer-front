export type TipoFuncionario = "gestor" | "gerente" | "tecnico"
export type StatusFuncionario = "ativo" | "inativo"
export type NivelAcesso = "basico" | "intermediario" | "administrador"

export interface FuncionarioItf {
  id: number
  nome: string
  email: string
  telefone: string
  tipo: TipoFuncionario
  departamento: string
  dataContratacao: string
  status: StatusFuncionario

  // Campos específicos para cada tipo
  // Gestor
  nivelAcesso?: NivelAcesso
  equipes?: string[]

  // Gerente
  areasResponsavel?: string[]
  metasDesempenho?: string

  // Técnico
  especialidades?: string[]
  certificacoes?: string[]
  ferramentasHabilitado?: string[]
}
