'use client'

import { BarChart3, Wrench, Clock, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
// Função para buscar estatísticas do sistema


export default function Estatisticas() {
    // const [carregando, setCarregando] = useState(true);
    const [estatisticas, setEstatisticas] = useState({
        totalAtivos: 0,
        emManutencao: 0,
        manutencoesProgramadas: 0,
        alertasCriticos: 0,
        ultimosAtivos: [] as string[],
    });

    useEffect(() => {
        // Função temporária para simular a busca de dados
        const fetchEstatisticas = () => {
            setTimeout(() => {
                setEstatisticas({
                    totalAtivos: 120,
                    emManutencao: 15,
                    manutencoesProgramadas: 8,
                    alertasCriticos: 3,
                    ultimosAtivos: ["Ativo 1", "Ativo 2", "Ativo 3"],
                });
            }, 1000); // Simula um atraso de 1 segundo
        };

        fetchEstatisticas();
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Total de Ativos</p>
                        <p className="text-2xl font-bold">{estatisticas.totalAtivos}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                        <BarChart3 className="h-6 w-6 text-blue-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Em Manutenção</p>
                        <p className="text-2xl font-bold">{estatisticas.emManutencao}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <Wrench className="h-6 w-6 text-yellow-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Manutenções Programadas</p>
                        <p className="text-2xl font-bold">{estatisticas.manutencoesProgramadas}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <Clock className="h-6 w-6 text-green-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Alertas Críticos</p>
                        <p className="text-2xl font-bold">{estatisticas.alertasCriticos}</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}