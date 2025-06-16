import { AtivoItf } from "./AtivoItf";

export interface SistemaItf {
  id: number;
  nome: string;
  id_area: number;
  codigo: string;
  ativo: AtivoItf[];
}
