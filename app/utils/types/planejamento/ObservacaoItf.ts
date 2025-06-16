import { UsuarioItf } from "../usuarioItf";


export interface ObservacaoItf {
  id: number;
  ordemServicoId: number;
  texto: string;
  criadoEm: string; // ou Date, dependendo de como você manipula datas
  responsavel: UsuarioItf;
}
