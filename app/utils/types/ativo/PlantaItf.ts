import { AreaItf } from './AreaItf';

export interface PlantaItf {
  id: number;
  nome: string;
  localizacao: string;
  codigo: string;
  area: AreaItf[];
}
