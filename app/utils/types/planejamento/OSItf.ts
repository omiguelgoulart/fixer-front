
import { AtivoItf } from "../ativo/AtivoITF"
import { InsumoItf } from "./insumoItf"
import { TarefaItf } from "./tarefaItf"
import { UsuarioItf } from "../usuarioItf"

export type StatusOrdem = "EM_ABERTO" | "CONCLUIDA" // baseado no payload
export type PrioridadeOrdem = "ALTA" | "MEDIA" | "BAIXA"

export type TipoManutencao = "CORRETIVA" | "PREVENTIVA" | "PREDITIVA"

export interface OrdemServicoItf {
  id: number
  titulo: string
  codigo: string
  status: StatusOrdem
  prioridade: PrioridadeOrdem
  tipoManutencao: TipoManutencao
  responsavelId: number
  usuarioId: number
  ativoId: number

  dataInicioPlanejada: string
  dataVencimento: string
  createdAt: string
  updatedAt: string

  responsavel: UsuarioItf
  usuario: UsuarioItf
  ativo: AtivoItf

  tarefas: TarefaItf[]
  insumos: InsumoItf[]
}
