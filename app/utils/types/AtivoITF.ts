import { SubAtivoItf } from './SubAtivoItf';

export interface AtivoItf {
  id: number;
  nome: string;
  fabricante: string;
  modelo: string;
  data_aquisicao: string;
  localizacao_interna: string;
  tipo_ativo: 'MECANICO' | 'ELETRICO' | 'ELETRONICO' | 'HIDRAULICO' | 'OUTRO';
  situacao: 'ATIVO' | 'INATIVO' | 'MANUTENCAO' | 'DESCARTADO';
  criticidade: 'ALTA' | 'MEDIA' | 'BAIXA';
  id_sistema: number;
  codigo: string;
  subativos: SubAtivoItf[];

  id_planta?: number;
  id_area?: number;
}
