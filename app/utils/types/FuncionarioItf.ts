import { OrdemServicoItf } from "./planejamento/OSItf"

export type TipoFuncionario = "GESTOR" | "GERENTE" | "TECNICO"
export type NivelAcesso = "basico" | "intermediario" | "administrador"


export interface FuncionarioItf {
  id: number
  nome: string
  email: string
  senha?: string
  ativo: boolean
  tipo: TipoFuncionario
  telefone?: string
  dataContratacao?: string // Date do Prisma vira string no frontend
  codRecuperaSenha?: string
  codRecuperaSenhaExpiracao?: string

  // Relacionamentos (tipados corretamente)
  observacoes?: string[]
  ordensResponsavel?: OrdemServicoItf[]
  ordensServico?: OrdemServicoItf[]
}
