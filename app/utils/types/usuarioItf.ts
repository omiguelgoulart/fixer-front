export interface UsuarioItf {
  id: number
  nome: string
  email: string
  senha: string
  ativo: boolean
  tipo: "GESTOR" | "OPERADOR" | string
}