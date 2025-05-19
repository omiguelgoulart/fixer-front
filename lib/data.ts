import { OrdemServicoItf } from "@/app/utils/types/planejamento"

// Simulação de busca de dados do servidor
export async function getAssetDetails(assetId: string) {
    // Normalmente, isso seria uma chamada a uma API ou banco de dados
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulando latência de rede
  
    // Dados mockados para o exemplo
    return {
      id: assetId,
      name: "Motor Principal",
      type: "Equipamento",
      code: "AS-MP-001",
      manufacturer: "Wärtsilä",
      model: "WBL32",
      serialNumber: "WRTSL123456",
      installationDate: "2020-01-01",
      lastMaintenanceDate: "2024-01-15",
      nextMaintenanceDate: "2024-04-15",
      criticality: "Nível A",
      imageUrl: "/placeholder.svg?height=400&width=400",
      manualFileName: "Motor.pdf",
      manualUrl: "/documents/motor.pdf",
    }
  }
  



// Esta função seria substituída por uma chamada de API real
export async function getPlanejamento(): Promise<OrdemServicoItf[]> {
  // Simulando uma chamada de API com um pequeno delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 12345467,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Alta",
      responsavelId: "ID",
      responsavel: "Jefferson Wellington",
      ativo: "Motor Honda v12",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "14/04/2025",
      dataVencimento: "19/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345468,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Baixa",
      responsavelId: "ID",
      responsavel: "Maria Silva",
      ativo: "Motor Yamaha x10",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "15/04/2025",
      dataVencimento: "20/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345469,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Média",
      responsavelId: "ID",
      responsavel: "Carlos Santos",
      ativo: "Motor Suzuki k8",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "16/04/2025",
      dataVencimento: "21/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345470,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Baixa",
      responsavelId: "ID",
      responsavel: "Ana Oliveira",
      ativo: "Motor Kawasaki z900",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "17/04/2025",
      dataVencimento: "22/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345471,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Média",
      responsavelId: "ID",
      responsavel: "Pedro Almeida",
      ativo: "Motor Ducati v4",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "18/04/2025",
      dataVencimento: "23/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345472,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Alta",
      responsavelId: "ID",
      responsavel: "Juliana Costa",
      ativo: "Motor BMW r1250",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "19/04/2025",
      dataVencimento: "24/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345473,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Média",
      responsavelId: "ID",
      responsavel: "Roberto Ferreira",
      ativo: "Motor Triumph t120",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "20/04/2025",
      dataVencimento: "25/04/2025",
      tipoManutencao: "Preventiva",
    },
    {
      id: 12345474,
      titulo: "Lubrificação preventiva",
      status: "Em aberto",
      prioridade: "Baixa",
      responsavelId: "ID",
      responsavel: "Fernanda Lima",
      ativo: "Motor Harley Davidson",
      localizacaoId: "ID",
      localizacao: "Sala de máquinas",
      dataInicioPlanejada: "21/04/2025",
      dataVencimento: "26/04/2025",
      tipoManutencao: "Preventiva",
    },
  ]
}
