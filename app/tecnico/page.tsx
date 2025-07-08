"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EstatisticasOrdens from "./components/EstatisticasOrdens";
import ListaOrdens from "./components/ListaOrdens";
import { useRouter } from "next/navigation";
import { useUsuario } from "../contexts/UsuarioContex";
import { useTecnico } from "./stores/useTecnico";

export default function TecnicoPage() {
  const [busca, setBusca] = useState("");
  const router = useRouter();
  const { usuario } = useUsuario();

  const { ordens, carregando, buscarOrdens } = useTecnico();

  useEffect(() => {
    if (usuario) {
      buscarOrdens(usuario.id);
    }
  }, [usuario, buscarOrdens]);

  if (carregando) return <p>Carregando...</p>;

  const filtradas = ordens.filter(
    (o) =>
      o.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      o.ativo?.nome?.toLowerCase().includes(busca.toLowerCase()) ||
      o.ativo?.localizacao_interna?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-4 bg-blue-50">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Minhas Ordens de Serviço</h1>
        <p className="text-gray-600">
          Visualize e gerencie suas ordens de manutenção
        </p>
      </header>

      <EstatisticasOrdens ordens={ordens} />

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Buscar por título, ativo ou localização..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      <ListaOrdens
        ordens={filtradas}
        onSelect={(ordem) => router.push(`/tecnico/ordem/${ordem.id}`)}
      />

      {filtradas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Nenhuma ordem encontrada
        </div>
      )}
    </div>
  );
}
