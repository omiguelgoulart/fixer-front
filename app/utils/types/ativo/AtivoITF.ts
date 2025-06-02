import { SubAtivoItf } from './SubAtivoItf';

export interface AtivoItf {
  name: any;
  id: number;
  nome: string;
  fabricante: string;
  modelo: string;
  data_aquisicao: string;
  localizacao_interna: string;
  lastMaintenanceDate: string;
  tipo_ativo: 'MECANICO' | 'ELETRICO' | 'ELETRONICO' | 'HIDRAULICO' | 'OUTRO';
  situacao: 'ATIVO' | 'INATIVO' | 'MANUTENCAO' | 'DESCARTADO';
  criticidade: 'ALTA' | 'MEDIA' | 'BAIXA';
  id_sistema: number;
  codigo: string;
  foto?: string;
  subativos: SubAtivoItf[];

  id_planta?: number;
  id_area?: number;
}
