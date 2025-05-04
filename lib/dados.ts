// Simulação de busca de dados do servidor
export async function obterDetalhesAtivo(ativoId: string) {
    // Normalmente, isso seria uma chamada a uma API ou banco de dados
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulando latência de rede
  
    // Dados mockados para o exemplo
    return {
      id: ativoId,
      nome: "Motor Principal",
      tipo: "Equipamento",
      codigo: "AS-MP-001",
      fabricante: "Wärtsilä",
      modelo: "WBL32",
      numeroSerie: "WRTSL123456",
      dataInstalacao: "2020-01-01",
      dataUltimaManutencao: "2024-01-15",
      dataProximaManutencao: "2024-04-15",
      criticidade: "Nível A",
      urlImagem: "/placeholder.svg?height=400&width=400",
      nomeArquivoManual: "Motor.pdf",
      urlManual: "/documentos/motor.pdf",
    }
  }
  