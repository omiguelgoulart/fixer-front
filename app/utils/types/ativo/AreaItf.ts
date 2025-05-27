import { SistemaItf } from './SistemaItf';

export interface AreaItf {
  id: number;
  nome: string;
  id_planta: number;
  codigo: string;
  sistema: SistemaItf[];
}
