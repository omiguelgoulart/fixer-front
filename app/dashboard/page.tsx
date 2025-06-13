"use client";

import Estatisticas from "./components/Estatisticas";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <Estatisticas />
    </div>
  );
}

