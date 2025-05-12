export interface SubAtivoItf {
  id: number;
  nome: string;
  tipo: string;
  codigo: string;
  id_ativo: number;

  id_planta?: number;
  id_area?: number;
  id_sistema?: number;
}
