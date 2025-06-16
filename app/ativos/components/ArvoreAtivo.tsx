"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  FolderCog,
  Cog,
  CircleDot,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { PlantaItf } from "@/app/utils/types/ativo/PlantaItf";

export default function ArvoreAtivos({
  onSelecionarAtivo,
}: {
  onSelecionarAtivo: (id: number) => void;
}) {
  const [plantas, setPlantas] = useState<PlantaItf[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchPlantas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/planta`);
        if (!response.ok) throw new Error("Erro ao carregar dados");
        const dados = await response.json();
        setPlantas(dados);
      } catch {
        console.error("Erro ao carregar plantas");
      } finally {
        setCarregando(false);
      }
    }
    fetchPlantas();
  }, []);

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

  const selecionarDetalhes = (tipo: string, id: number) => {
    if (tipo === "ativo") {
      onSelecionarAtivo(id);
    }
  };

  if (carregando) {
    return (
      <div className="py-4 px-2">
        <div className="animate-pulse space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
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
                <span className="ml-2 text-xs text-gray-500">({planta.codigo})</span>
                <span className="ml-2 text-xs italic text-gray-400">
                  - {planta.localizacao}
                </span>
              </div>
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
                    </div>

                    {estaExpandido("area", area.id) && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {area.sistema.map((sistema) => (
                          <li key={`sistema-${sistema.id}`} className="py-1">
                            <div
                              className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
                              onClick={() => alternarExpansao("sistema", sistema.id)}
                            >
                              <span className="mr-1">
                                {estaExpandido("sistema", sistema.id) ? (
                                  <ChevronDown className="h-3 w-3 text-gray-500" />
                                ) : (
                                  <ChevronRight className="h-3 w-3 text-gray-500" />
                                )}
                              </span>
                              <Cog className="h-4 w-4 text-blue-600" />
                              <span className="ml-2 text-sm">{sistema.nome}</span>
                              <span className="ml-2 text-xs text-gray-500">
                                {sistema.codigo}
                              </span>
                            </div>

                            {estaExpandido("sistema", sistema.id) && (
                              <ul className="ml-6 mt-1 space-y-1">
                                {sistema.ativo.map((ativo) => (
                                  <li key={`ativo-${ativo.id}`} className="py-1">
                                    <div
                                      className="flex items-center cursor-pointer hover:bg-blue-100 rounded-md px-2 py-1"
                                      onClick={() => selecionarDetalhes("ativo", ativo.id)}
                                    >
                                      <Cog className="h-4 w-4 text-green-600" />
                                      <span className="ml-2 text-sm">{ativo.nome}</span>
                                      <span className="ml-2 text-xs text-gray-500">
                                        {ativo.codigo}
                                      </span>
                                    </div>

                                    {estaExpandido("ativo", ativo.id) &&
                                      ativo.subativos &&
                                      ativo.subativos.length > 0 && (
                                        <ul className="ml-6 mt-1 space-y-1">
                                          {ativo.subativos.map((subativo) => (
                                            <li
                                              key={`subativo-${subativo.id}`}
                                              className="py-1"
                                            >
                                              <div className="flex items-center hover:bg-blue-100 rounded-md px-2 py-1">
                                                <CircleDot className="h-4 w-4 text-purple-600" />
                                                <span className="ml-2 text-sm">
                                                  {subativo.nome}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                  {subativo.codigo}
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
