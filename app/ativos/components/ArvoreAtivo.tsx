"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  FolderCog,
  Cog,
  ChevronRight,
  ChevronDown,
  Pencil,
  Trash,
} from "lucide-react";
import { useAtivos } from "../stores/useAtivos";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormularioPlanta from "./formularios/FormPlanta";
import FormularioArea from "./formularios/FormArea";
import FormularioSistema from "./formularios/FormSistema";

// Tipos específicos
type SubAtivo = {
  id: number;
  nome: string;
  codigo: string;
};

type Ativo = {
  id: number;
  nome: string;
  codigo: string;
  subativos?: SubAtivo[];
};

type Sistema = {
  id: number;
  nome: string;
  codigo: string;
  id_area: number;
  ativo: Ativo[];
};

type Area = {
  id: number;
  nome: string;
  codigo: string;
  id_planta: number;
  sistema: Sistema[];
};

type Planta = {
  id: number;
  nome: string;
  codigo: string;
  localizacao: string;
  area: Area[];
  id_area?: number;
};

export default function ArvoreAtivos({
  onSelecionarAtivo,
}: {
  onSelecionarAtivo: (id: number) => void;
}) {
  const {
    plantas,
    carregarPlantas,
    excluirPlanta,
    excluirArea,
    excluirSistema,
  } = useAtivos();

  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({});
  const [dialog, setDialog] = useState<{
    tipo: "planta" | "area" | "sistema";
    acao: "editar" | "excluir";
    item: Planta | Area | Sistema;
  } | null>(null);

  useEffect(() => {
    carregarPlantas();
  }, [carregarPlantas]);

  const alternarExpansao = (tipo: string, id: number) => {
    const chave = `${tipo}-${id}`;
    setExpandidos((prev) => ({
      ...prev,
      [chave]: !prev[chave],
    }));
  };

  const estaExpandido = (tipo: string, id: number): boolean => {
    return !!expandidos[`${tipo}-${id}`];
  };

  const Acoes = ({
    tipo,
    item,
  }: {
    tipo: "planta" | "area" | "sistema";
    item: Planta | Area | Sistema;
  }) => (
    <span className="ml-auto flex items-center gap-1">
      <Pencil
        onClick={(e) => {
          e.stopPropagation();
          setDialog({ tipo, acao: "editar", item });
        }}
        className="h-4 w-4 text-gray-400 hover:text-blue-600 cursor-pointer"
      />
      <Trash
        onClick={(e) => {
          e.stopPropagation();
          setDialog({ tipo, acao: "excluir", item });
        }}
        className="h-4 w-4 text-gray-400 hover:text-red-600 cursor-pointer"
      />
    </span>
  );

  const confirmarAcao = () => {
    if (!dialog) return;
    const { tipo, acao, item } = dialog;

    if (acao === "excluir") {
      if (tipo === "planta") excluirPlanta(item.id);
      if (tipo === "area") excluirArea(item.id);
      if (tipo === "sistema") excluirSistema(item.id);
      setDialog(null);
    }
  };

  if (!plantas || plantas.length === 0) {
    return (
      <div className="py-4 px-2">
        <div className="animate-pulse space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <ul className="space-y-1">
        {plantas.map((planta) => (
          <li key={`planta-${planta.id}`} className="py-1">
            <div
              className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
              onClick={() => alternarExpansao("planta", planta.id)}
            >
              <span className="mr-1">
                {estaExpandido("planta", planta.id) ? (
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-gray-500" />
                )}
              </span>
              <Building2 className="h-4 w-4 text-red-600" />
              <div className="ml-2 text-sm font-medium">
                <span>{planta.nome}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({planta.codigo})
                </span>
                <span className="ml-2 text-xs italic text-gray-400">
                  - {planta.localizacao}
                </span>
              </div>
              <Acoes tipo="planta" item={planta} />
            </div>

            {estaExpandido("planta", planta.id) && (
              <ul className="ml-6 mt-1 space-y-1">
                {planta.area.map((area) => (
                  <li key={`area-${area.id}`} className="py-1">
                    <div
                      className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
                      onClick={() => alternarExpansao("area", area.id)}
                    >
                      <span className="mr-1">
                        {estaExpandido("area", area.id) ? (
                          <ChevronDown className="h-3 w-3 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-gray-500" />
                        )}
                      </span>
                      <FolderCog className="h-4 w-4 text-orange-600" />
                      <span className="ml-2 text-sm">{area.nome}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {area.codigo}
                      </span>
                      <Acoes tipo="area" item={area} />
                    </div>

                    {estaExpandido("area", area.id) && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {area.sistema.map((sistema) => (
                          <li key={`sistema-${sistema.id}`} className="py-1">
                            <div
                              className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
                              onClick={() =>
                                alternarExpansao("sistema", sistema.id)
                              }
                            >
                              <span className="mr-1">
                                {estaExpandido("sistema", sistema.id) ? (
                                  <ChevronDown className="h-3 w-3 text-gray-500" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-gray-500" />
                                )}
                              </span>
                              <Cog className="h-4 w-4 text-blue-600" />
                              <span className="ml-2 text-sm">
                                {sistema.nome}
                              </span>
                              <span className="ml-2 text-xs text-gray-500">
                                {sistema.codigo}
                              </span>
                              <Acoes tipo="sistema" item={sistema} />
                            </div>

                            {estaExpandido("sistema", sistema.id) && (
                              <ul className="ml-6 mt-1 space-y-1">
                                {sistema.ativo.map((ativo) => (
                                  <li
                                    key={`ativo-${ativo.id}`}
                                    className="py-1"
                                  >
                                    <div
                                      className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
                                      onClick={() =>
                                        onSelecionarAtivo(ativo.id)
                                      }
                                    >
                                      <Cog className="h-4 w-4 text-green-600" />
                                      <span className="ml-2 text-sm">
                                        {ativo.nome}
                                      </span>
                                      <span className="ml-2 text-xs text-gray-500">
                                        {ativo.codigo}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

<Dialog open={!!dialog} onOpenChange={(open) => !open && setDialog(null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {dialog?.acao === "excluir"
          ? `Tem certeza que deseja excluir esta ${dialog?.tipo}?`
          : `Editar ${dialog?.tipo}`}
      </DialogTitle>
    </DialogHeader>

    <div className="py-4 text-sm">
      {dialog?.acao === "excluir" ? (
        "Esta ação não poderá ser desfeita."
      ) : dialog?.tipo === "planta" ? (
        <FormularioPlanta
          valoresIniciais={{
            id: dialog.item.id,
            nome: dialog.item.nome,
            codigo: dialog.item.codigo,
            localizacao: (dialog.item as Planta).localizacao,
          }}
          onClose={() => setDialog(null)}
        />
      ) : dialog?.tipo === "area" ? (
        <FormularioArea
          valoresIniciais={{
            id: dialog.item.id,
            nome: dialog.item.nome,
            codigo: dialog.item.codigo,
            id_planta: (dialog.item as Area).id_planta, // ajuste conforme necessário
          }}
          onClose={() => setDialog(null)}
        />
      ) : dialog?.tipo === "sistema" ? (
        <FormularioSistema
          valoresIniciais={{
            id: dialog.item.id,
            nome: dialog.item.nome,
            codigo: dialog.item.codigo,
            id_area: (dialog.item as Sistema).id_area, // ajuste conforme necessário
          }}
          onClose={() => setDialog(null)}
        />
      ) : null}
    </div>

    <DialogFooter>
      {dialog?.acao === "excluir" && (
        <>
          <Button variant="outline" onClick={() => setDialog(null)}>
            Cancelar
          </Button>
          <Button onClick={confirmarAcao}>Excluir</Button>
        </>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>


    </div>
  );
}
