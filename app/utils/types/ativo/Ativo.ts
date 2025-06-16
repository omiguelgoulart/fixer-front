import { SubAtivoItf } from "./SubAtivoItf";

export interface AtivoItf {
  id: number;
  nome: string;
  codigo: string;
  fabricante: string;
  modelo: string;
  tipo_ativo: 'MECANICO' | 'ELETRICO' | 'ELETRONICO' | 'HIDRAULICO' | 'PNEUMATICO' | 'OUTRO';
  situacao: 'ATIVO' | 'INATIVO' | 'MANUTENCAO' | 'DESCARTADO';
  criticidade: 'ALTA' | 'MEDIA' | 'BAIXA';

  data_aquisicao?: string | null;
  localizacao_interna?: string | null;
  foto?: string | null;

  id_planta?: number;
  id_area?: number;
  id_sistema: number;

  subativos?: SubAtivoItf[];

  // Campo "name" pode ser excluído se for redundante com "nome"
  name?: string;
}
